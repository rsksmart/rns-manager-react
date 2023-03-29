import {
  reverseRegistrar as reverseRegistryAddress,
} from '../../../adapters/configAdapter';
import { reverseAbi } from './abis.json';
import { sendBrowserNotification } from '../../../browerNotifications/operations';
import { ethers } from 'ethers';

import {
  requestResolver, receiveResolver, requestSetReverseResolver, waitingSetReverseResolver,
  receieveSetReverseResolver, errorSetReverseResolver, errorResolver,
} from './actions';
import getSigner from '../../../helpers/getSigner';
import { reverse } from '../../../rns-sdk';

/**
 * Get reverse value when given an address
 * @param {address} address the address to lookup
 */
export const getReverse = address => async (dispatch) => {
  dispatch(requestResolver());

  const signer = await getSigner();
  try {
    const response = await reverse(signer).reverse(address.toLowerCase());
    dispatch(receiveResolver(response));
    return response;
  } catch (error) {
    dispatch(errorResolver(error.message));
    return null;
  }
};

/**
 * Set reverse value for the currentAddress
 * @param {string} value value to be set
 */
export const setReverse = value => async (dispatch) => {
  const signer = await getSigner();

  dispatch(requestSetReverseResolver());

  const reverseRegistry = new ethers.Contract(
    reverseRegistryAddress, reverseAbi, signer,
  );

  try {
    const result = await reverseRegistry.setName(value);
    dispatch(waitingSetReverseResolver());
    sendBrowserNotification('RSK Manager', 'reverse_success');
    return dispatch(receieveSetReverseResolver(value, result));
  } catch (error) {
    return dispatch(errorSetReverseResolver(error.message));
  }
};
