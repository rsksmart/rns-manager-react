import {
  requestGetAddr, receiveGetAddr, errorGetAddr, requestSetAddr, receiveSetAddr, errorSetAddr,
  requestGetContent, receiveGetContent, errorGetContent, requestSetContent, receiveSetContent, errorSetContent,
} from './actions';

import { resolver as resolverAddress } from '../../../config/contracts';
import { hash as namehash } from 'eth-ens-namehash';

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
  },
  {
    "constant": false,
    "inputs": [
      { "name": "node", "type": "bytes32" },
      { "name": "addrValue", "type": "address" }
    ],
    "name": "setAddr",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      { "name": "node", "type": "bytes32" }
    ],
    "name": "content",
    "outputs": [
      { "name": "", "type": "bytes32" }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      { "name": "node", "type": "bytes32" },
      { "name": "hash", "type": "bytes32" }
    ],
    "name": "setContent",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }
]).at(resolverAddress);

export const getAddr = domain => dispatch => {
  dispatch(requestGetAddr());

  const hash = namehash(domain);

  return new Promise(resolve => {
    resolver.addr(hash, (error, result) => {
      if (error) return resolve(dispatch(errorGetAddr(error)));
      return resolve(dispatch(receiveGetAddr(result)));
    });
  });
};

export const setAddr = (domain, addr) => dispatch => {
  dispatch(requestSetAddr());

  const hash = namehash(domain);

  return new Promise(resolve => {
    resolver.setAddr(hash, addr, (error, result) => {
      if (error) return resolve(dispatch(errorSetAddr(error)));
      return resolve(dispatch(receiveSetAddr(result)));
    });
  });
};

export const getContent = domain => dispatch => {
  dispatch(requestGetContent());

  const hash = namehash(domain);

  return new Promise(resolve => {
    resolver.content(hash, (error, result) => {
      if (error) return resolve(dispatch(errorGetContent(error)));
      return resolve(dispatch(receiveGetContent(result)));
    });
  });
};

export const setContent = (domain, addr) => dispatch => {
  dispatch(requestSetContent());

  const hash = namehash(domain);

  return new Promise(resolve => {
    resolver.setContent(hash, addr, (error, result) => {
      if (error) return resolve(dispatch(errorSetContent(error)));
      return resolve(dispatch(receiveSetContent(result)));
    });
  });
};
