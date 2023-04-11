import Web3 from 'web3';
import { keccak_256 as sha3 } from 'js-sha3';
import { hash as namehash, normalize } from '@ensdomains/eth-ens-namehash';
import RNS from '@rsksmart/rns';

import { getOptions } from '../../../adapters/RNSLibAdapter';

import transactionListener from '../../../helpers/transactionListener';
import {
  requestNewSubdomain,
  receiveNewSubdomain,
  errorNewSubdomain,
  addSubdomainToList,
  clearSubdomainList,
  waitingNewSubdomainConfirm,
  waitingSetSubdomainOwner,
  receiveSetSubdomainOwner,
  errorSetSubdomainOwner,
  removeSubdomainFromList,
} from './actions';

import { EMPTY_ADDRESS } from '../types';

import { resolveDomain } from '../../resolve/operations';
import { sendBrowserNotification } from '../../../browerNotifications/operations';
import { resolver, rns } from '../../../rns-sdk';
import getSigner from '../../../helpers/getSigner';
import { publicResolver } from '../../../adapters/configAdapter';

const getRNS = () => {
  const web3 = new Web3(window.rLogin);
  return new RNS(web3, getOptions());
};

const updateSubdomainToLocalStorage = (domain, subdomain, add = true) => {
  const storedSubdomains = localStorage.getItem('subdomains')
    ? JSON.parse(localStorage.getItem('subdomains'))
    : {};
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

const registerSubdomain = (
  parentDomain,
  subdomain,
  newOwner,
  setupResolution,
) => async (dispatch) => {
  dispatch(waitingNewSubdomainConfirm());

  const signer = await getSigner();

  const r = rns(signer);

  try {
    const result = await (
      await r.setSubdomainOwner(parentDomain, subdomain, newOwner)
    ).wait();

    if (setupResolution) {
      await (
        await r.setResolver(`${subdomain}.${parentDomain}`, publicResolver)
      ).wait();
      const addrResolver = resolver(signer);
      await (
        await addrResolver.setAddr(`${subdomain}.${parentDomain}`, newOwner)
      ).wait();
    }

    dispatch(addSubdomainToList(subdomain, newOwner));
    dispatch(receiveNewSubdomain(result.transactionHash));
    updateSubdomainToLocalStorage(parentDomain, subdomain, true);
    sendBrowserNotification(
      `${subdomain}.${parentDomain}`,
      'register_subdomain',
    );
  } catch (error) {
    dispatch(errorNewSubdomain(error.message));
  }
};

const getSubdomainOwner = (domain, subdomain) => async (dispatch) => {
  const hash = namehash(`${subdomain}.${domain}`);

  const r = getRNS();
  await r.compose();
  await r.contracts.registry.methods.owner(hash).call((error, result) => {
    if (!error) {
      if (result !== EMPTY_ADDRESS) {
        dispatch(addSubdomainToList(subdomain, result));
      }
    }
  });
};

/**
 * Create a subdomain or add it to the list of subdomains in local storage
 * if existent.
 * @param {string} parentDomain the domain to add the subdomain for
 * @param {string} subdomain label for the subdomain to add
 * @param {address} newOwner owner to set for the subdomain
 * @param {Object[]} subdomainList the list of known and stored domains
 * @param {boolean} setupResolution if true, sets the resolver and address for the subdomain
 */
export const newSubdomain = (
  parentDomain,
  subdomain,
  newOwner,
  subdomainList,
  setupResolution,
) => async (dispatch) => {
  dispatch(requestNewSubdomain());

  // get address if it ends with .rsk
  const newAddress = (await newOwner.endsWith('.rsk'))
    ? await dispatch(resolveDomain(newOwner, null, errorNewSubdomain, null))
    : newOwner;

  if (!newAddress) {
    return null;
  }

  const isAvailable = await rns().getSubdomainAvailability(
    parentDomain,
    subdomain,
  );

  if (isAvailable) {
    return dispatch(
      registerSubdomain(parentDomain, subdomain, newAddress, setupResolution),
    );
  }

  if (subdomainList[subdomain]) {
    // already on the list below
    return dispatch(
      errorNewSubdomain(`${subdomain}.${parentDomain} is already registered.`),
    );
  }

  // already was registered, but not in localStorage:
  updateSubdomainToLocalStorage(parentDomain, subdomain, true);
  dispatch(getSubdomainOwner(parentDomain, subdomain));
  return dispatch(
    errorNewSubdomain(
      `${subdomain}.${parentDomain} was already registered. It has been added below.`,
    ),
  );
};

/**
 * Get all subdomains for a domain in local storage and get all the owners.
 * @param {string} domain to get the subdomain owners of
 */
export const getSubdomainListFromLocalStorage = domain => (dispatch) => {
  dispatch(clearSubdomainList());

  const storedSubdomains = JSON.parse(localStorage.getItem('subdomains'));

  if (!storedSubdomains || !storedSubdomains[domain]) {
    return;
  }

  storedSubdomains[domain].forEach((subdomain) => {
    dispatch(getSubdomainOwner(domain, subdomain));
  });
};

/**
 * Change a subdomain's owner if is different from the current,
 * and remove it from local storage if is transferred to 0x00.
 * @param {string} parentDomain the domain to change the subdomain owner for
 * @param {string} subdomain label for the subdomain to change the owner
 * @param {address} newOwner owner to set for the subdomain
 * @param {address} currentOwner the current owner
 */
export const setSubdomainOwner = (
  parentDomain,
  subdomain,
  newOwner,
  currentOwner,
) => async (dispatch) => {
  dispatch(waitingSetSubdomainOwner(subdomain));

  // get address if it ends with .rsk
  const newAddress = (await newOwner.endsWith('.rsk'))
    ? await dispatch(
      resolveDomain(
        newOwner,
        null,
        response => errorSetSubdomainOwner(subdomain, response),
        currentOwner,
      ),
    )
    : newOwner;

  if (!newAddress) {
    return;
  }

  const accounts = await window.rLogin.request({ method: 'eth_accounts' });
  const currentAddress = accounts[0];
  const label = `0x${sha3(normalize(subdomain))}`;
  const node = namehash(parentDomain);

  const r = getRNS();
  await r.compose();
  r.contracts.registry.methods
    .setSubnodeOwner(node, label, newAddress)
    .send({ from: currentAddress }, (error, result) => {
      if (error) {
        return dispatch(errorSetSubdomainOwner(subdomain, error.message));
      }

      const transactionConfirmed = listenerParams => (listenerDispatch) => {
        listenerDispatch(
          receiveSetSubdomainOwner(
            listenerParams.resultTx,
            listenerParams.subdomain,
            listenerParams.newAddress,
          ),
        );

        if (listenerParams.newAddress === EMPTY_ADDRESS) {
          sendBrowserNotification(
            `${listenerParams.subdomain}.${listenerParams.parentDomain}`,
            'remove_subdomain',
          );
          updateSubdomainToLocalStorage(
            listenerParams.parentDomain,
            listenerParams.subdomain,
            false,
          );
          listenerDispatch(removeSubdomainFromList(listenerParams.subdomain));
        } else {
          sendBrowserNotification(
            `${listenerParams.subdomain}.${listenerParams.parentDomain}`,
            'update_subdomain',
          );
        }
      };

      return dispatch(
        transactionListener(
          result,
          transactionConfirmed,
          { subdomain, newAddress, parentDomain },
          listenerParams => listenerDispatch => listenerDispatch(
            errorSetSubdomainOwner(
              listenerParams.subdomain,
              listenerParams.errorReason,
            ),
          ),
          { subdomain },
        ),
      );
    });
};
