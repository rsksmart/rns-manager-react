import { keccak_256 as sha3 } from 'js-sha3';

import { ethers } from 'ethers';
import {
  rskOwner as rskOwnerAddress,
  registrar as tokenRegistrarAddress,
} from '../../adapters/configAdapter';
import { rskOwnerAbi, tokenRegistrarAbi } from './abis.json';
import {
  toggleBasicAdvanced, checkIfSubdomain, requestCheckTokenOwner, receiveCheckTokenOwner,
  errorCheckTokenOwner, requestFifsMigrationStatus, receiveFifsMigrationStatus,
  errorFifsMigrationStatus, requestRegistryOwner, receiveRegistryOwner, errorRegistryOwner,
} from './actions';

import { checkIfSubdomainAndGetExpirationRemaining } from './domainInfo/operations';
import { getDomainResolver } from './resolver/operations';
import getSigner from '../../helpers/getSigner';
import { rns } from '../../rns-sdk';

/**
 * Checks if the wallet's account is the RSK Token owner
 * @param {string} domain to check
 */
export const checkIfTokenOwner = domain => async (dispatch) => {
  const label = domain.split('.')[0];

  const signer = await getSigner();
  const currentAddress = await signer.getAddress();

  dispatch(requestCheckTokenOwner());

  const hash = `0x${sha3(label)}`;

  const rskOwner = new ethers.Contract(
    rskOwnerAddress,
    rskOwnerAbi,
    signer,
  );

  try {
    const domainOwner = await rskOwner.ownerOf(hash);
    return dispatch(receiveCheckTokenOwner(
      domainOwner.toLowerCase() === currentAddress.toLowerCase(),
      domainOwner,
    ));
  } catch (error) {
    return dispatch(errorCheckTokenOwner());
  }
};

/**
 * Checks if the wallet's account is the RNS Registry Owner
 * @param {string} domain to check
 */
export const checkIfRegistryOwner = domain => async (dispatch) => {
  try {
    const signer = await getSigner();
    const currentAddress = await signer.getAddress();

    const RNS = await rns(signer);
    dispatch(requestRegistryOwner());
    const owner = await RNS.getOwner(domain);
    return dispatch(receiveRegistryOwner(
      owner, owner.toLowerCase() === currentAddress.toLowerCase(),
    ));
  } catch (error) {
    return dispatch(errorRegistryOwner(error.message));
  }
};

/**
 * Checkis if the domain was registered using the FIFS registrar
 * @param {string} domain to check
 */
export const checkIfFIFSRegistrar = domain => async (dispatch) => {
  try {
    dispatch(requestFifsMigrationStatus());

    const label = `0x${sha3(domain.split('.')[0])}`;

    const signer = await getSigner();

    const tokenRegistrar = new ethers.Contract(
      tokenRegistrarAddress,
      tokenRegistrarAbi,
      signer,
    );

    const result = await tokenRegistrar.entries(label);

    const mode = result[0];

    return dispatch(receiveFifsMigrationStatus(mode !== '2'));
  } catch (error) {
    return dispatch(errorFifsMigrationStatus());
  }
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
