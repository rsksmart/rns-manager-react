import {
  requestStartAuction,
  receiveStartAuction,
  errorStartAuction
} from './actions';
import { keccak_256 as sha3 } from 'js-sha3';
import { registrar as registrarAddress } from '../../../config/contracts';

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
]).at(registrarAddress);

export const startAuction = domain => dispatch => {
  if(!domain) return dispatch(errorStartAuction('Please search for a domain state first.'));

  dispatch(requestStartAuction());

  let hash = `0x${sha3(domain.split('.')[0])}`;

  return new Promise((resolve) => {
    registrar.startAuction(hash, (error, result) => {
      if(error) {
        return resolve(dispatch(errorStartAuction(error.message)));
      }

      return resolve(dispatch(receiveStartAuction(result)));
    });
  });
};
