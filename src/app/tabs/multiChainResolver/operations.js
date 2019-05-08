import { content, chainAddr } from './actions';
import { multiChainResolver as resolverAddress } from '../../../config/contracts';
import { txTypes, notifyTx, notifyError } from '../../notifications';
import { get, set } from '../../factories/operationFactory';
import { hash as namehash } from 'eth-ens-namehash';

const resolver = window.web3 && window.web3.eth.contract([
  {
    'constant': true,
    'inputs': [
      { 'name': 'node', 'type': 'bytes32' }
    ],
    'name': 'content',
    'outputs': [
      { 'name': '', 'type': 'bytes32' }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': false,
    'inputs': [
      { 'name': 'node', 'type': 'bytes32' },
      { 'name': 'hash', 'type': 'bytes32' }
    ],
    'name': 'setContent',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [
      { 'name': 'node', 'type': 'bytes32' },
      { 'name': 'chain', 'type': 'bytes4' }
    ],
    'name': 'chainAddr',
    'outputs': [
      { 'name': '', 'type': 'string' }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function',
    'signature': '0x8be4b5f6'
  },
  {
    'constant': false,
    'inputs': [
      { 'name': 'node', 'type': 'bytes32' },
      { 'name': 'chain', 'type': 'bytes4' },
      { 'name': 'addrValue', 'type': 'string' }
    ],
    'name': 'setChainAddr',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function',
    'signature': '0xd278b400'
  }
]).at(resolverAddress);

export const getContent = get(content.requestGet, content.receiveGet, resolver && resolver.content);
export const setContent = set(content.requestSet, content.receiveSet, txTypes.SET_CONTENT, resolver && resolver.setContent);

export const getChainAddr = (name, chainId) => dispatch => {
  console.log(name)
  console.log(chainId)
  dispatch(chainAddr.requestGet());

  const hash = namehash(name);

  return new Promise(resolve => {
    resolver.chainAddr(hash, chainId, (error, result) => {
      console.log(error)
      if (error) return resolve(dispatch(notifyError(error.message)));
      return resolve(dispatch(chainAddr.receiveGet(result)));
    });
  });
};

export const setChainAddr = (name, chainId, value) => dispatch => {
  dispatch(chainAddr.requestSet());

  const hash = namehash(name);

  return new Promise((resolve) => {
    resolver.setChainAddr(hash, chainId, value, (error, result) => {
      dispatch(chainAddr.receiveSet());
      if (error) return resolve(dispatch(notifyError(error.message)));
      return resolve(dispatch(notifyTx(result, '', { type: txTypes.SET_CHAIN_ADDR, name, chainId, value })));
    });
  });
};
