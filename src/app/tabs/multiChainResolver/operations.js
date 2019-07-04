import { hash as namehash } from 'eth-ens-namehash';
import { content, chainAddr } from './actions';
import { multiChainResolver as resolverAddress } from '../../../config/contracts';
import { txTypes, notifyTx, notifyError } from '../../notifications';
import { get, set } from '../../factories/operationFactory';
import abi from './abi';

const resolver = window.web3 && window.web3.eth.contract(abi).at(resolverAddress);

export const getContent = get(content.requestGet, content.receiveGet, resolver && resolver.content);
export const setContent = set(
  content.requestSet,
  content.receiveSet,
  txTypes.SET_CONTENT,
  resolver && resolver.setContent,
  getContent,
);

export const getChainAddr = (name, chainId) => (dispatch) => {
  dispatch(chainAddr.requestGet());

  const hash = namehash(name);

  return new Promise((resolve) => {
    resolver.chainAddr(hash, chainId, (error, result) => {
      if (error) return resolve(dispatch(notifyError(error.message)));
      return resolve(dispatch(chainAddr.receiveGet(result)));
    });
  });
};

export const setChainAddr = (name, chainId, value) => (dispatch) => {
  dispatch(chainAddr.requestSet());

  const hash = namehash(name);

  return new Promise((resolve) => {
    resolver.setChainAddr(hash, chainId, value, (error, result) => {
      dispatch(chainAddr.receiveSet());
      if (error) return resolve(dispatch(notifyError(error.message)));
      return resolve(dispatch(notifyTx(result, '', {
        type: txTypes.SET_CHAIN_ADDR, name, chainId, value, addr: window.web3.eth.accounts[0],
      }, () => getChainAddr(name, chainId))));
    });
  });
};
