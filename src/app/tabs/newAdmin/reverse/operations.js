import Web3 from 'web3';
import RNS from '@rsksmart/rns';

import { getOptions } from '../../../adapters/RNSLibAdapter';

import transactionListener from '../../../helpers/transactionListener';
import { sendBrowserNotification } from '../../../browerNotifications/operations';

import {
  requestResolver, receiveResolver, requestSetReverseResolver, waitingSetReverseResolver,
  receieveSetReverseResolver, errorSetReverseResolver, errorResolver,
} from './actions';


const web3 = new Web3(window.ethereum);
const rns = new RNS(web3, getOptions());

/**
 * Get reverse value when given an address
 * @param {address} address the address to lookup
 */
export const getReverse = address => (dispatch) => {
  dispatch(requestResolver());

  rns.reverse(address.toLowerCase())
    .then((response) => {
      dispatch(receiveResolver(response));
      return response;
    })
    .catch((error) => {
      dispatch(errorResolver(error.message));
      return null;
    });
};

/**
 * Set reverse value for the currentAddress
 * @param {string} value value to be set
 */
export const setReverse = value => async (dispatch) => {
  dispatch(requestSetReverseResolver());
  rns.setReverse(value)
    .then((result) => {
      dispatch(waitingSetReverseResolver());

      const transactionConfirmed = () => () => {
        sendBrowserNotification('RSK Manager', 'reverse_success');
        dispatch(receieveSetReverseResolver(value, result.transactionHash));
      };

      return dispatch(transactionListener(result.transactionHash, () => transactionConfirmed()));
    })
    .catch(error => dispatch(errorSetReverseResolver(error.message)));
};
