import Web3 from 'web3';
import { keccak_256 as sha3 } from 'js-sha3';
import { requestDomainState, receiveDomainState, blockedDomain } from './actions';
import { rskOwner as rskOwnerAddress } from '../../../config/contracts';
import { notifyError } from '../../notifications';
import { rskMain } from '../../../config/nodes';
import { rskOwnerAbi } from './abis';

export default domain => (dispatch) => {
  if (!domain) {
    return dispatch(receiveDomainState(''));
  }

  dispatch(requestDomainState());

  const web3 = new Web3(rskMain);

  const rskOwner = new web3.eth.Contract(rskOwnerAbi, rskOwnerAddress);

  const hash = `0x${sha3(domain.split('.')[0])}`;

  return rskOwner.methods.available(hash).call()
    .then((available) => {
      if (!available) {
        return dispatch(receiveDomainState(false));
      }

      if (domain.length <= 5) {
        return dispatch(blockedDomain());
      }

      return dispatch(receiveDomainState(available));
    })
    .catch(error => dispatch(notifyError(error.message)));
};
