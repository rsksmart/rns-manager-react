import Web3 from 'web3';
import RNS from '@rsksmart/rns';

import { getOptions } from '../../../adapters/RNSLibAdapter';

import {
  requestResolver, receiveResolver,
} from './actions';


const web3 = new Web3(window.ethereum);
const rns = new RNS(web3, getOptions());

export const getReverse = address => (dispatch) => {
  dispatch(requestResolver());

  try {
    rns.reverse(address)
      .then((value) => {
        dispatch(receiveResolver(value));
      });
  } catch (err) {
    // Resolver not set
    receiveResolver('');
  }
};

export const setReverse = (domain, value) => (dispatch) => {

};
