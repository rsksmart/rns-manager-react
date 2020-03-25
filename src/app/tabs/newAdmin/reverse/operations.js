import Web3 from 'web3';
import RNS from '@rsksmart/rns';

import { reverseRegistrar as reverseRegistryAddress } from '../../../adapters/configAdapter';
import { gasPrice as defaultGasPrice } from '../../../adapters/gasPriceAdapter';
import { reverseAbi } from './abis.json';

import transactionListener from '../../../helpers/transactionListener';
import { getOptions } from '../../../adapters/RNSLibAdapter';

import {
  requestResolver, receiveResolver, requestSetReverseResolver, waitingSetReverseResolver,
  receieveSetReverseResolver, errorSetReverseResolver,
} from './actions';


const web3 = new Web3(window.ethereum);
const rns = new RNS(web3, getOptions());
const reverseRegistry = new web3.eth.Contract(
  reverseAbi, reverseRegistryAddress, { gasPrice: defaultGasPrice },
);

/**
 * Get reverse value when given an address
 * @param {address} address the address to lookup
 */
export const getReverse = address => (dispatch) => {
  dispatch(requestResolver());

  try {
    rns.reverse(address)
      .then((value) => {
        dispatch(receiveResolver(value));
      });
  } catch (err) {
    // Resolver not set
    dispatch(receiveResolver(''));
  }
};

/**
 * Set reverse value for the currentAddress
 * @param {string} value value to be set
 */
export const setReverse = value => async (dispatch) => {
  const accounts = await window.ethereum.enable();
  const currentAddress = accounts[0];

  dispatch(requestSetReverseResolver());

  reverseRegistry.methods.setName(value).send(
    { from: currentAddress }, (error, result) => {
      if (error) {
        return dispatch(errorSetReverseResolver(error.message));
      }

      dispatch(waitingSetReverseResolver());
      return dispatch(transactionListener(result, () => receieveSetReverseResolver(value, result)));
    },
  );
};
