import { requestFinalize, receiveFinalize, errorFinalize } from './actions';
import { registrar as registrarAddress } from '../../../config/contracts.json';
import { keccak_256 as sha3 } from 'js-sha3';

export const finalize = domain => dispatch => {
  if (!domain) return dispatch(errorFinalize('Please search for a domain state first.'));

  dispatch(requestFinalize());

  const registrar = window.web3.eth.contract([
    {
      "constant": false,
      "inputs": [
        { "name": "_hash", "type": "bytes32" }
      ],
      "name": "finalizeAuction",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]).at(registrarAddress);

  const hash = `0x${sha3(domain.split('.')[0])}`;

  return new Promise(resolve => {
    registrar.finalizeAuction(hash, (error, result) => {
      if (error) return resolve(dispatch(errorFinalize(error.message)));
      return resolve(dispatch(receiveFinalize(result)));
    });
  });
};
