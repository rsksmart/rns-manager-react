import {
  requestDomainState, receiveDomainState
} from './actions';
import { keccak_256 as sha3 } from 'js-sha3';
import { registrar as registrarAddress } from '../../../config/contracts';

export const getAuctionState = domain => dispatch => {
  if (!domain) {
    dispatch(receiveDomainState(''));
    return;
  }

  dispatch(requestDomainState(domain));

  const registrar = window.web3.eth.contract([
    {
      "constant": true,
      "inputs": [
        { "name": "_hash", "type": "bytes32" }
      ],
      "name": "state",
      "outputs": [
        { "name": "", "type": "uint8" }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ]).at(registrarAddress);

  const hash = '0x' + sha3(domain.split('.')[0]);

  return new Promise((resolve, reject) => {
    registrar.state(hash, (error, result) => {
      if(error) reject(error);

      let state = result.toNumber();

      dispatch(receiveDomainState(state));

      resolve(state);
    });
  });
}
