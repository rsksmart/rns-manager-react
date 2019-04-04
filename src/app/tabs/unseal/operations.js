import { requestUnseal, receiveUnseal } from './actions';
import { registrar as registrarAddress } from '../../../config/contracts.json';
import { keccak_256 as sha3 } from 'js-sha3';
import { notifyTx, notifyError } from '../../notifications';

export const unseal = (domain, value) => dispatch => {
  dispatch(requestUnseal());

  const registrar = window.web3.eth.contract([
    {
      "constant": false,
      "inputs": [
        { "name": "_hash", "type": "bytes32" },
        { "name": "_value", "type": "uint256" },
        { "name": "_salt", "type": "bytes32" }
      ],
      "name": "unsealBid",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]).at(registrarAddress);

  let hash = `0x${sha3(domain.split('.')[0])}`;
  let tokens = value * (10 ** 18);

  return new Promise(resolve => {
    registrar.unsealBid(hash, tokens, 0, (error, result) => {
      dispatch(receiveUnseal());

      if (error) return resolve(dispatch(notifyError(error.message)));

      return resolve(dispatch(notifyTx(result)));
    });
  });
};
