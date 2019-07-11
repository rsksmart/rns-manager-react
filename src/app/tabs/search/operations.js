import Web3 from 'web3';
import { keccak_256 as sha3 } from 'js-sha3';
import { requestDomainState, receiveDomainState } from './actions';
import { registrar as registrarAddress } from '../../../config/contracts';
import { notifyError } from '../../notifications';
import { rskMain } from '../../../config/nodes';
import { registrarAbi, deedAbi } from './abis';

export default domain => (dispatch) => {
  if (!domain) {
    return dispatch(receiveDomainState(''));
  }

  dispatch(requestDomainState());

  const web3 = new Web3(rskMain);

  const registrar = new web3.eth.Contract(registrarAbi, registrarAddress);

  const hash = `0x${sha3(domain.split('.')[0])}`;

  return registrar.methods.entries(hash).call()
    .then((entry) => {
      const state = entry[0];

      if (state !== 2) {
        return dispatch(receiveDomainState(state));
      }

      const deedAddress = entry[1];

      const deed = new web3.eth.Contract(deedAbi, deedAddress);

      return deed.methods.expirationDate().call()
        .then((expirationDate) => {
          if (expirationDate === 0) {
            return dispatch(receiveDomainState(2));
          }

          return dispatch(receiveDomainState(5));
        });
    })
    .catch(error => dispatch(notifyError(error.message)));
};
