import Web3 from 'web3';
import { keccak_256 as sha3 } from 'js-sha3';
import { hash as namehash } from 'eth-ens-namehash';
import RNS from '@rsksmart/rns';

import JslibOptions from '../../../adapters/jslibAdapter';

import transactionListener from '../../../helpers/transactionListener';
import {
  requestNewSubdomain, receiveNewSubdomain, errorNewSubdomain, addSubdomainToList,
  clearSubdomainList, waitingNewSubdomainConfirm, requestSetSubdomainOwner,
  waitingSetSubdomainOwner, receiveSetSubdomainOwner, errorSetSubdomainOwner,
  removeSubdomainFromList,
} from './actions';

const web3 = new Web3(window.ethereum);

// JS library:
const rns = new RNS(web3, JslibOptions());

// Adding new subdomains:
export const updateSubdomainToLocalStorage = (domain, subdomain, add = true) => {
  const storedSubdomains = localStorage.getItem('subdomains')
    ? JSON.parse(localStorage.getItem('subdomains')) : {};
  if (!storedSubdomains[domain]) {
    storedSubdomains[domain] = [];
  }

  if (add) {
    storedSubdomains[domain].push(subdomain);
  } else {
    storedSubdomains[domain].pop(subdomain);
  }

  localStorage.setItem('subdomains', JSON.stringify(storedSubdomains));
};

export const registerSubDomain = (parentDomain, subdomain, newOwner) => async (dispatch) => {
  dispatch(requestNewSubdomain());

  const accounts = await window.ethereum.enable();
  const currentAddress = accounts[0];

  const label = `0x${sha3(subdomain)}`;
  const node = namehash(parentDomain);

  await rns.compose();
  await rns.contracts.registry.methods.setSubnodeOwner(node, label, newOwner)
    .send({ from: currentAddress }, (error, result) => {
      if (error) {
        return dispatch(errorNewSubdomain(error.message));
      }

      dispatch(waitingNewSubdomainConfirm());

      const transactionConfirmed = () => () => {
        dispatch(addSubdomainToList(subdomain, newOwner));
        dispatch(receiveNewSubdomain(result));
        updateSubdomainToLocalStorage(parentDomain, subdomain, true);
      };

      return dispatch(transactionListener(result, () => transactionConfirmed()));
    });
};

export const getSubdomainOwner = (domain, subdomain) => async (dispatch) => {
  const hash = namehash(`${subdomain}.${domain}`);

  await rns.compose();
  await rns.contracts.registry.methods.owner(hash).call((error, result) => {
    if (!error) {
      dispatch(addSubdomainToList(subdomain, result));
    }
  });
};

export const newSubDomain = (
  parentDomain, subdomain, newOwner, subdomainList,
) => async (dispatch) => {
  const isAvailable = await rns.subdomains.available(parentDomain, subdomain);
  if (isAvailable) {
    return dispatch(registerSubDomain(parentDomain, subdomain, newOwner));
  }

  if (subdomainList[subdomain]) {
    // already on the list below
    return dispatch(errorNewSubdomain(`${subdomain} is already registered.`));
  }

  // already was registered, but not in localStorage:
  updateSubdomainToLocalStorage(parentDomain, subdomain, true);
  dispatch(getSubdomainOwner(parentDomain, subdomain));
  return dispatch(errorNewSubdomain(`${subdomain} was already registered. It has been added below.`));
};


// Subdomain View list:
export const getSubdomainListFromLocalStorage = domain => (dispatch) => {
  dispatch(clearSubdomainList());

  const storedSubdomains = JSON.parse(localStorage.getItem('subdomains'));

  if (!storedSubdomains || !storedSubdomains[domain]) {
    return null;
  }

  return storedSubdomains[domain].forEach((subdomain) => {
    dispatch(getSubdomainOwner(domain, subdomain));
  });
};

// Editing Subdomain owners:
export const setSubdomainOwner = (
  parentDomain, subdomain, newOwner, currentOwner,
) => async (dispatch) => {
  dispatch(requestSetSubdomainOwner(subdomain));

  if (newOwner === currentOwner) {
    return dispatch(errorSetSubdomainOwner(subdomain, 'The subdomain is already owned by that address'));
  }

  const accounts = await window.ethereum.enable();
  const currentAddress = accounts[0];
  const label = `0x${sha3(subdomain)}`;
  const node = namehash(parentDomain);

  await rns.compose();
  return rns.contracts.registry.methods.setSubnodeOwner(node, label, newOwner)
    .send({ from: currentAddress }, (error, result) => {
      if (error) {
        return dispatch(errorSetSubdomainOwner(subdomain, error.message));
      }

      dispatch(waitingSetSubdomainOwner(subdomain));

      const transactionConfirmed = () => () => {
        dispatch(receiveSetSubdomainOwner(result, subdomain, newOwner));

        if (newOwner === '0x0000000000000000000000000000000000000000') {
          updateSubdomainToLocalStorage(parentDomain, subdomain, false);
          dispatch(removeSubdomainFromList(subdomain));
        }
      };

      return dispatch(transactionListener(result, () => transactionConfirmed()));
    });
};
