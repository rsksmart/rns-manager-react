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
  const name = (`${subdomain}.${domain}`);

  const r = rns();
  const owner = await r.getOwner(name);
  if (owner !== EMPTY_ADDRESS) {
    dispatch(addSubdomainToList(subdomain, owner));
  }
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
  const newAddress = await newOwner.endsWith('.rsk')
    ? await dispatch(resolveDomain(newOwner, errorNewSubdomain, null)) : newOwner;

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
  const newAddress = await newOwner.endsWith('.rsk')
    ? await dispatch(resolveDomain(
      newOwner,
      response => errorSetSubdomainOwner(subdomain, response),
      currentOwner,
    )) : newOwner;

  if (!newAddress) {
    return;
  }

  const r = rns(await getSigner());

  try {
    const result = await (await r.setSubdomainOwner(parentDomain, subdomain, newAddress)).wait();

    dispatch(
      receiveSetSubdomainOwner(
        result.transactionHash,
        subdomain,
        newAddress,
      ),
    );

    if (newAddress === EMPTY_ADDRESS) {
      sendBrowserNotification(
        `${subdomain}.${parentDomain}`,
        'remove_subdomain',
      );
      updateSubdomainToLocalStorage(
        parentDomain,
        subdomain,
        false,
      );
      dispatch(removeSubdomainFromList(subdomain));
    } else {
      sendBrowserNotification(
        `${subdomain}.${parentDomain}`,
        'update_subdomain',
      );
    }
  } catch (error) {
    dispatch(errorSetSubdomainOwner(subdomain, error.message));
  }
};
