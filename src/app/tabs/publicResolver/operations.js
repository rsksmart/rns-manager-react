import { addr, content } from './actions';
import { publicResolver as resolverAddress } from '../../../config/contracts';
import { txTypes } from '../../notifications';
import { get, set } from '../../factories/operationFactory';

const resolver = window.web3 && window.web3.eth.contract([
  {
    'constant': true,
    'inputs': [
      { 'name': 'node', 'type': 'bytes32' }
    ],
    'name': 'addr',
    'outputs': [
      { 'name': '', 'type': 'address' }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': false,
    'inputs': [
      { 'name': 'node', 'type': 'bytes32' },
      { 'name': 'addrValue', 'type': 'address' }
    ],
    'name': 'setAddr',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
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
  }
]).at(resolverAddress);

export const getAddr = get(addr.requestGet, addr.receiveGet, resolver && resolver.addr);
export const getContent = get(content.requestGet, content.receiveGet, resolver && resolver.content);

export const setAddr = set(addr.requestSet, addr.receiveSet, txTypes.SET_ADDR, resolver && resolver.setAddr);
export const setContent = set(content.requestSet, content.receiveSet, txTypes.SET_CONTENT, resolver && resolver.setContent);
