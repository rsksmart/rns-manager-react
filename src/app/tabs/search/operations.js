import Web3 from 'web3';
import { keccak_256 as sha3 } from 'js-sha3';
import { requestDomainState, receiveDomainState, blockedDomain } from './actions';
import { fifsRegistrar as registrarAddress } from '../../../config/contracts';
import { notifyError } from '../../notifications';
import { rskMain } from '../../../config/nodes';
import { registrarAbi } from './abis';

export default domain => (dispatch) => {
  if (!domain) {
    return dispatch(receiveDomainState(''));
  }

  if (domain.length <= 5) {
    return dispatch(blockedDomain(true));
  }

  dispatch(requestDomainState());

  const web3 = new Web3(rskMain);

  const registrar = new web3.eth.Contract(registrarAbi, registrarAddress);

  const hash = `0x${sha3(domain.split('.')[0])}`;

  return registrar.methods.available(hash).call()
    .then(available => dispatch(receiveDomainState(available)))
    .catch(error => dispatch(notifyError(error.message)));
};
