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
} from './actions';

const web3 = new Web3(window.ethereum);

// JS library:
const rns = new RNS(web3, JslibOptions());

// Adding new subdomains:
export const saveSubdomainToLocalStorage = (domain, subdomain) => {
  const storedSubdomains = localStorage.getItem('subdomains')
    ? JSON.parse(localStorage.getItem('subdomains')) : {};
  if (!storedSubdomains[domain]) {
    storedSubdomains[domain] = [];
  }
  storedSubdomains[domain].push(subdomain);
  localStorage.setItem('subdomains', JSON.stringify(storedSubdomains));
};

export const registerSubDomain = (parentDomain, subdomain, newOwner) => async (dispatch) => {
  dispatch(requestNewSubdomain(subdomain));

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
        saveSubdomainToLocalStorage(parentDomain, subdomain);
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

  const isInList = subdomainList.filter(sub => sub.name === subdomain).length;
  if (isInList) {
    // already on the list below
    return dispatch(errorNewSubdomain(`${subdomain} is already registered.`));
  }

  // already was registered, but not in localStorage:
  saveSubdomainToLocalStorage(parentDomain, subdomain);
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

      const transactionConfirmed = () => () => dispatch(
        receiveSetSubdomainOwner(result, subdomain, newOwner),
      );

      return dispatch(transactionListener(result, () => transactionConfirmed()));
    });
};
