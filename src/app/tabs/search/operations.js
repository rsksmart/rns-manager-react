import {
  requestDomainState, receiveDomainState
} from './actions';
import { keccak_256 as sha3 } from 'js-sha3';

export const getAuctionState = domain => dispatch => {
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
  ]).at('0x5269f5bc51cdd8aa62755c97229b7eeddd8e69a6');

  const hash = '0x' + sha3(domain.split('.')[0]);

  return new Promise((resolve, reject) => {
    registrar.state(hash, (error, result) => {
      if(error) reject(error);

      let state = parseState(result);

      dispatch(receiveDomainState(state));

      resolve(state);
    });
  });
}

function parseState (state) {
  let stateNumber = state.toNumber();

  switch(stateNumber) {
    case 0: return 'Open';
    case 1: return 'Auction';
    case 2: return 'Owned';
    case 4: return 'Reveal';
    default: return 'Invalid';
  }
}
