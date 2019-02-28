import { requestUnseal, receiveUnseal, errorUnseal } from './actions';
import { registrar as registrarAddress } from '../../../config/contracts.json';
import { keccak_256 as sha3 } from 'js-sha3';

export const unseal = (domain, value) => dispatch => {
  if (!domain) return dispatch(errorUnseal('Please search for a domain state first.'));
  if (!value || value < 1) return dispatch(errorUnseal('You must bid at least 1 RIF.'));

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
      if (error) return resolve(dispatch(errorUnseal(error.message)));
      return resolve(dispatch(receiveUnseal(result)));
    });
  });
};
