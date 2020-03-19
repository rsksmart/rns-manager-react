import Web3 from 'web3';
import { hash as namehash } from 'eth-ens-namehash';

import {
  multiChainResolver as resolverAddress,
} from '../../../adapters/configAdapter';
import { gasPrice as defaultGasPrice } from '../../../adapters/gasPriceAdapter';

import {
  requestSetChainAddress, errorSetChainAddress, waitingSetChainAddress,
  receiveSetChainAddress,
} from './actions';
import abi from '../../multiChainResolver/abi.json';

import transactionListener from '../../../helpers/transactionListener';

const web3 = new Web3(window.ethereum);
const resolver = new web3.eth.Contract(abi, resolverAddress, { gasPrice: defaultGasPrice });

// eslint-disable-next-line import/prefer-default-export
export const setChainAddress = (domain, chainId, address) => async (dispatch) => {
  dispatch(requestSetChainAddress());

  const accounts = await window.ethereum.enable();
  const currentAddress = accounts[0];
  const hash = namehash(domain);

  resolver.methods.setChainAddr(hash, chainId, address).send(
    { from: currentAddress }, (error, result) => {
      dispatch(waitingSetChainAddress());
      if (error) {
        return dispatch(errorSetChainAddress(error.message));
      }
      const transactionConfirmed = () => () => {
        dispatch(receiveSetChainAddress(result));
      };
      return dispatch(transactionListener(result, () => transactionConfirmed()));
    },
  );
};
