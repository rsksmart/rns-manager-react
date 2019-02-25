import {
  requestResolveAddress, receiveResolveAddress,
  requestDomainState, receiveDomainState
} from './actions';
import { hash as namehash } from 'eth-ens-namehash';
import { keccak_256 as sha3 } from 'js-sha3';

export const resolveAddress = domain => dispatch => {
  dispatch(requestResolveAddress(domain));

  const resolver = window.web3.eth.contract([
    {
      "constant": true,
      "inputs": [
          { "name": "node", "type": "bytes32" }
      ],
      "name": "addr",
      "outputs": [
          { "name": "", "type": "address" }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ]).at('0x4efd25e3d348f8f25a14fb7655fba6f72edfe93a');

  const hash = namehash(domain);

  return new Promise((resolve, reject) => {
    resolver.addr(hash, (error, result) => {
      if(error) reject(error);

      dispatch(receiveResolveAddress(result));

      resolve(result);
    });
  });
};

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
