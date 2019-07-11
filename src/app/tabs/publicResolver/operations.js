import { addr, content } from './actions';
import { publicResolver as resolverAddress } from '../../../config/contracts';
import { txTypes } from '../../notifications';
import { get, set } from '../../factories/operationFactory';
import abi from './abi';

const resolver = window.web3 && window.web3.eth.contract(abi).at(resolverAddress);

export const getAddr = get(addr.requestGet, addr.receiveGet, resolver && resolver.addr);
export const getContent = get(content.requestGet, content.receiveGet, resolver && resolver.content);

export const setAddr = set(
  addr.requestSet,
  addr.receiveSet,
  txTypes.SET_ADDR,
  resolver && resolver.setAddr,
  getAddr,
);
export const setContent = set(
  content.requestSet,
  content.receiveSet,
  txTypes.SET_CONTENT,
  resolver && resolver.setContent,
  getContent,
);
