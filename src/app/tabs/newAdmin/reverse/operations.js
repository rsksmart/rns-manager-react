import Web3 from 'web3';
import RNS from '@rsksmart/rns';

import { getOptions } from '../../../adapters/RNSLibAdapter';

import {
  reverseRegistrar as reverseRegistryAddress,
} from '../../../adapters/configAdapter';
import { gasPrice as defaultGasPrice } from '../../../adapters/gasPriceAdapter';
import { reverseAbi } from './abis.json';

import transactionListener from '../../../helpers/transactionListener';
import { sendBrowserNotification } from '../../../browerNotifications/operations';

import {
  requestResolver, receiveResolver, requestSetReverseResolver, waitingSetReverseResolver,
  receieveSetReverseResolver, errorSetReverseResolver, errorResolver,
} from './actions';

/**
 * Get reverse value when given an address
 * @param {address} address the address to lookup
 */
export const getReverse = address => (dispatch) => {
  dispatch(requestResolver());

  const web3 = new Web3(window.rLogin);
  const rns = new RNS(web3, getOptions());

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
  const accounts = await window.rLogin.request({ method: 'eth_accounts' });
  const currentAddress = accounts[0];

  dispatch(requestSetReverseResolver());

  const web3 = new Web3(window.rLogin);
  const reverseRegistry = new web3.eth.Contract(
    reverseAbi, reverseRegistryAddress, { gasPrice: defaultGasPrice },
  );

  reverseRegistry.methods.setName(value).send(
    { from: currentAddress }, (error, result) => {
      if (error) {
        return dispatch(errorSetReverseResolver(error.message));
      }

      dispatch(waitingSetReverseResolver());

      const transactionConfirmed = listenerParams => (listenerDispatch) => {
        sendBrowserNotification('RSK Manager', 'reverse_success');
        listenerDispatch(receieveSetReverseResolver(listenerParams.value, listenerParams.resultTx));
      };

      return dispatch(transactionListener(
        result,
        transactionConfirmed,
        { value },
        listenerParams => listenerDispatch => listenerDispatch(
          errorSetReverseResolver(listenerParams.errorReason),
        ),
      ));
    },
  );
};
