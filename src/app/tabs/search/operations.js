import Web3 from 'web3';
import { keccak_256 as sha3 } from 'js-sha3';
import {
  requestDomainState, receiveDomainState, blockedDomain,
  requestDomainOwner, receiveDomainOwner, requestDomainCost, receiveDomainCost,
} from './actions';
import {
  rskOwner as rskOwnerAddress,
  fifsRegistrar as fifsRegistrarAddress,
} from '../../adapters/configAdapter';

import { notifyError } from '../../notifications';
import { rskNode } from '../../adapters/nodeAdapter';
import { rskOwnerAbi, fifsRegistrarAbi } from './abis.json';

export default domain => (dispatch) => {
  if (!domain) {
    return dispatch(receiveDomainState(''));
  }

  dispatch(requestDomainState());

  const web3 = new Web3(rskNode);

  const rskOwner = new web3.eth.Contract(rskOwnerAbi, rskOwnerAddress);

  const registrar = new web3.eth.Contract(fifsRegistrarAbi, fifsRegistrarAddress);

  const hash = `0x${sha3(domain.split('.')[0])}`;

  return rskOwner.methods.available(hash).call()
    .then((available) => {
      if (!available) {
        dispatch(receiveDomainState(false));
        dispatch(requestDomainOwner());
        return rskOwner.methods.ownerOf(hash).call()
          .then(owner => dispatch(receiveDomainOwner(owner)))
          .catch(error => dispatch(notifyError(error.message)));
      }

      if (domain.length < 5) {
        return dispatch(blockedDomain());
      }

      dispatch(requestDomainCost());
      registrar.methods.price(domain, 0, 1).call()
        .then((result) => {
          const rifCost = web3.utils.toBN(result).div(web3.utils.toBN('1000000000000000000'));
          dispatch(receiveDomainCost(web3.utils.toDecimal(rifCost)));
        })
        .catch(error => dispatch(notifyError(error.message)));

      return dispatch(receiveDomainState(available));
    })
    .catch(error => dispatch(notifyError(error.message)));
};
