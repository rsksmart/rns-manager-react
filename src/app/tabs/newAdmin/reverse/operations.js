import { ethers } from 'ethers';
import {
  reverseRegistrar as reverseRegistryAddress,
} from '../../../adapters/configAdapter';
import { reverseAbi } from './abis.json';
import { sendBrowserNotification } from '../../../browerNotifications/operations';

import {
  requestResolver, receiveResolver, requestSetReverseResolver, waitingSetReverseResolver,
  receieveSetReverseResolver, errorSetReverseResolver, errorResolver,
} from './actions';
import getSigner from '../../../helpers/getSigner';
import { reverse } from '../../../rns-sdk';
import getProvider from '../../../helpers/getProvider';

/**
 * Get reverse value when given an address
 * @param {address} address the address to lookup
 */
export const getReverse = address => async (dispatch) => {
  dispatch(requestResolver());

  try {
    const response = await reverse(address, getProvider());

    dispatch(receiveResolver(response));
    return response;
  } catch (error) {
    return dispatch(errorResolver(error.message));
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
    const result = await (await reverseRegistry['setName(string)'](value)).wait();
    dispatch(waitingSetReverseResolver());
    sendBrowserNotification('RSK Manager', 'reverse_success');
    return dispatch(receieveSetReverseResolver(value, result.transactionHash));
  } catch (error) {
    console.error(error);
    return dispatch(errorSetReverseResolver(error.message));
  }
};
