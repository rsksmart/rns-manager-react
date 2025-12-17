/* eslint-disable radix */
import { push } from 'connected-react-router';
import {
  rns as registryAddress,
} from '../adapters/configAdapter';
import { registrar, rns } from '../rns-sdk';
import { appKit } from '../appkit/appkitConfig';
import rLogin from '../rLogin/appkitAdapter';
import {
  closeModal,
  errorEnable,
  errorLogin,
  isWalletConnect,
  logOut,
  receiveEnable,
  receiveHasContracts,
  receiveHasWeb3Provider,
  receiveLogin,
  requestEnable,
  requestLogin,
} from './actions';

// const utf8ToHexString = string => (string ? Utils.asciiToHex(string).slice(2) : '');

/**
 * Save Domain into Local Storage to be used with login popup.
 * @param {string} domain to save into localStrage
 */
export const saveDomainToLocalStorage = async (domain) => {
  // eslint-disable-next-line prefer-const
  let storedDomains = localStorage.getItem('storedDomains')
    ? JSON.parse(localStorage.getItem('storedDomains')) : {};

  // environment:
  if (!storedDomains[process.env.REACT_APP_ENVIRONMENT]) {
    storedDomains[process.env.REACT_APP_ENVIRONMENT] = [];
  }

  const accounts = await window.rLogin.request({ method: 'eth_accounts' });
  const newDomain = {
    domain,
    owner: accounts[0],
  };

  if (
    storedDomains[process.env.REACT_APP_ENVIRONMENT].length === 0
    || storedDomains[process.env.REACT_APP_ENVIRONMENT].filter(d => d.domain === domain).length < 1
  ) {
    storedDomains[process.env.REACT_APP_ENVIRONMENT].push(newDomain);
    localStorage.setItem('storedDomains', JSON.stringify(storedDomains));
  }
};

/**
 * Removes domain that was saved in LocalStorage
 * @param {string} domain to be removed from local storage
 */
export const removeDomainToLocalStorage = (domain) => {
  const storedDomains = localStorage.getItem('storedDomains')
    ? JSON.parse(localStorage.getItem('storedDomains')) : {};

  // does the environment exist? this should not happen:
  if (!storedDomains[process.env.REACT_APP_ENVIRONMENT]) {
    return;
  }

  const newEnv = storedDomains[process.env.REACT_APP_ENVIRONMENT].filter(d => d.domain !== domain);
  const newStoredDomains = {
    ...storedDomains,
    [process.env.REACT_APP_ENVIRONMENT]: newEnv,
  };

  localStorage.setItem('storedDomains', JSON.stringify(newStoredDomains));
};

const successfulLogin = (name, noRedirect) => (dispatch) => {
  if (!noRedirect) {
    dispatch(push('/newAdmin'));
  }

  localStorage.setItem('name', name);
  saveDomainToLocalStorage(name);

  dispatch(closeModal());
  return dispatch(receiveLogin(name, true));
};

const failedLogin = name => (dispatch) => {
  localStorage.removeItem('name');
  dispatch(push('/'));
  return dispatch(errorLogin('failed login', name));
};

export const authenticate = (name, address, noRedirect) => async (dispatch) => {
  if (!address) return null;

  dispatch(requestLogin());

  const registry = rns();
  const rskRegistrar = await registrar();

  try {
    // get rns registry owner
    const registryOwner = await registry.getOwner(name);

    if (address.toLowerCase() === registryOwner.toLowerCase()) {
      // can perform registry operations, success
      return dispatch(successfulLogin(name, noRedirect));
    }

    const labels = name.split('.');

    if (labels.length === 1 || labels[labels.length - 1] !== 'rsk') {
      // is not a domain or is not a .rsk domain, fail
      return dispatch(failedLogin(name));
    }

    const label = labels[0];

    const available = await rskRegistrar.available(label);

    if (available) {
      // it has no owner, fail
      return dispatch(failedLogin(name));
    }

    // owned in rsk registrar
    const owner = await rskRegistrar.ownerOf(label);
    if (owner.toLowerCase() === address.toLowerCase()) {
      // success
      return dispatch(successfulLogin(name, noRedirect));
    }

    // fail
    return dispatch(failedLogin(name));
  } catch (error) {
    return dispatch(errorLogin(error));
  }
};

const startWithRLogin = callback => (dispatch) => {
  dispatch(receiveHasWeb3Provider(true));
  dispatch(receiveHasContracts(registryAddress !== ''));

  dispatch(requestEnable());

  window.rLogin.request({ method: 'eth_accounts' })
    .then((accounts) => {
      window.rLogin.request({ method: 'eth_chainId' })
        .then(chainId => parseInt(chainId))
        .then(chainId => dispatch(receiveEnable(
          accounts[0],
          chainId,
          chainId === parseInt(process.env.REACT_APP_ENVIRONMENT_ID),
          accounts.length !== 0,
        )));

      if (window.location.search.includes('autologin')) {
        dispatch(authenticate(window.location.search.split('=')[1], accounts[0]));
      } else if (localStorage.getItem('name')) {
        dispatch(authenticate(localStorage.getItem('name'), accounts[0], true));
      }
    })
    .then(() => callback && callback())
    .catch(e => dispatch(errorEnable(e.stack)));

  window.rLogin.on('accountsChanged', () => dispatch(startWithRLogin()));
};

/**
 * Logs out of the manager and rLogin leaving domains in localStorage
 * @param {string} redirect Optional URL to redirect to, defaults to home
 */
export const logoutManager = (redirect = '') => (dispatch) => {
  localStorage.removeItem('name');
  localStorage.removeItem('walletconnect');
  try {
    appKit.adapter?.connectionControllerClient?.disconnect?.();
  } catch (e) {
    // ignore disconnection errors
  }
  window.rLogin = null;
  dispatch(logOut());
  dispatch(push(`/${redirect}`));
};

/**
 * Disconnect a single domain from the Manager, also logout if it is the current domain
 * @param {string} domain to be removed from localstorage
 * @param {boolean} isCurrent is it the current domain logged in?
 */
export const disconnectDomain = (domain, isCurrent) => (dispatch) => {
  removeDomainToLocalStorage(domain);

  if (isCurrent) {
    dispatch(logOut());
    localStorage.removeItem('name');
    dispatch(push('/'));
  }
};

export const start = (callback, callbackError) => (dispatch) => {
  if (!window.rLogin) {
    return rLogin.connect().then(response => response.provider).then((provider) => {
      window.rLogin = provider;

      provider.on('accountsChanged', () => dispatch(startWithRLogin(callback)));
      provider.on('chainChanged', () => dispatch(startWithRLogin(callback)));
      provider.on('disconnect', () => dispatch(logoutManager()));

      dispatch(isWalletConnect(!!provider.wc));
      dispatch(startWithRLogin(callback));
    })
      .catch(err => callbackError && callbackError(err));
  }

  return dispatch(startWithRLogin(callback));
};

export const autoLogin = domain => async (dispatch) => {
  const accounts = await window.rLogin.request({ method: 'eth_accounts' });
  dispatch(authenticate(domain, accounts[0]));
};
