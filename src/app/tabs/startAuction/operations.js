import {
  requestStartAuction,
  receiveStartAuction,
  errorStartAuction
} from './actions';
import { keccak_256 as sha3 } from 'js-sha3';

const registrar = window.web3.eth.contract([
  {
    "constant": false,
    "inputs": [
      { "name": "_hash", "type": "bytes32" }
    ],
    "name": "startAuction",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }
]).at('0x5269f5bc51cdd8aa62755c97229b7eeddd8e69a6');

export const startAuction = domain => dispatch => {
  if(!domain) return dispatch(errorStartAuction('Please search for a domain state first.'));

  dispatch(requestStartAuction());

  let hash = `0x${sha3(domain)}`;

  return new Promise((resolve) => {
    registrar.startAuction(hash, (error, result) => {
      if(error) {
        dispatch(errorStartAuction(error));
        resolve(error);
        return;
      }

      return resolve(dispatch(receiveStartAuction(result.message)));
    });
  });
};
