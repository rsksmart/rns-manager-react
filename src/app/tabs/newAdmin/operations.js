import Web3 from 'web3';
import { keccak_256 as sha3 } from 'js-sha3';
import RNS from '@rsksmart/rns';
import { hash as namehash } from 'eth-ens-namehash';

import {
  rskOwner as rskOwnerAddress,
  registrar as tokenRegistrarAddress,
} from '../../adapters/configAdapter';
import { rskOwnerAbi, tokenRegistrarAbi } from './abis.json';
import { gasPrice as defaultGasPrice } from '../../adapters/gasPriceAdapter';
import { getOptions } from '../../adapters/RNSLibAdapter';

import {
  toggleBasicAdvanced, checkIfSubdomain, requestCheckTokenOwner, receiveCheckTokenOwner,
  errorCheckTokenOwner, requestFifsMigrationStatus, receiveFifsMigrationStatus,
  errorFifsMigrationStatus, requestRegistryOwner, receiveRegistryOwner, errorRegistryOwner,
} from './actions';

import { checkIfSubdomainAndGetExpirationRemaining } from './domainInfo/operations';
import { getDomainResolver } from './resolver/operations';

/**
 * Checks if the wallet's account is the RSK Token owner
 * @param {string} domain to check
 */
export const checkIfTokenOwner = domain => async (dispatch) => {
  const label = domain.split('.')[0];

  const accounts = await window.rLogin.enable();
  const currentAddress = accounts[0];

  dispatch(requestCheckTokenOwner());

  const hash = `0x${sha3(label)}`;

  const web3 = new Web3(window.rLogin);

  const rskOwner = new web3.eth.Contract(
    rskOwnerAbi, rskOwnerAddress, { gasPrice: defaultGasPrice },
  );

  rskOwner.methods.ownerOf(hash).call((error, result) => {
    if (error) {
      dispatch(errorCheckTokenOwner());
      return;
    }

    const domainOwner = result;

    dispatch(receiveCheckTokenOwner(
      domainOwner.toLowerCase() === currentAddress.toLowerCase(),
      domainOwner,
    ));
  });
};

/**
 * Checks if the wallet's account is the RNS Registry Owner
 * @param {string} domain to check
 */
export const checkIfRegistryOwner = domain => async (dispatch) => {
  const label = namehash(domain);
  const accounts = await window.rLogin.enable();
  const currentAddress = accounts[0];

  const web3 = new Web3(window.rLogin);
  const rns = new RNS(web3, getOptions());

  dispatch(requestRegistryOwner());
  await rns.compose();
  await rns.contracts.registry.methods.owner(label)
    .call((error, result) => {
      if (error) {
        return dispatch(errorRegistryOwner(error.message));
      }
      return dispatch(receiveRegistryOwner(
        result, result.toLowerCase() === currentAddress.toLowerCase(),
      ));
    });
};

/**
 * Checkis if the domain was registered using the FIFS registrar
 * @param {string} domain to check
 */
export const checkIfFIFSRegistrar = domain => async (dispatch) => {
  dispatch(requestFifsMigrationStatus());

  return new Promise((resolve) => {
    const label = `0x${sha3(domain.split('.')[0])}`;
    const web3 = new Web3(window.rLogin);

    const tokenRegistrar = new web3.eth.Contract(
      tokenRegistrarAbi, tokenRegistrarAddress, { gasPrice: defaultGasPrice },
    );

    tokenRegistrar.methods.entries(label).call((error, result) => {
      if (error) {
        return dispatch(errorFifsMigrationStatus());
      }

      const mode = result[0];

      return resolve(dispatch(receiveFifsMigrationStatus(mode !== '2')));
    });
  });
};

/**
 * The Admin's initial start method
 * @param {*} domain that is currently logged in
 */
export const start = domain => (dispatch) => {
  const showAdvancedView = localStorage.getItem('adminAdvancedView');
  dispatch(toggleBasicAdvanced(showAdvancedView === 'true'));

  const labelsAmount = domain.split('.').length;
  dispatch(checkIfSubdomain(labelsAmount > 2));

  dispatch(checkIfTokenOwner(domain));
  dispatch(checkIfFIFSRegistrar(domain));
  dispatch(getDomainResolver(domain));
  dispatch(checkIfSubdomainAndGetExpirationRemaining(domain));
  dispatch(checkIfRegistryOwner(domain));
};

export const toggleBasicAdvancedSwitch = showAdvancedView => (dispatch) => {
  dispatch(toggleBasicAdvanced(showAdvancedView));
  localStorage.setItem('adminAdvancedView', showAdvancedView);
};
