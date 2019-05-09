import { requestFinalize, receiveFinalize } from './actions';
import { registrar as registrarAddress } from '../../../config/contracts.json';
import { keccak_256 as sha3 } from 'js-sha3';
import { notifyTx, notifyError, txTypes } from '../../notifications';
import { authenticate } from '../../auth';

export const finalize = domain => dispatch => {
  dispatch(requestFinalize());

  const registrar = window.web3.eth.contract([
    {
      'constant': false,
      'inputs': [
        { 'name': '_hash', 'type': 'bytes32' }
      ],
      'name': 'finalizeAuction',
      'outputs': [],
      'payable': false,
      'stateMutability': 'nonpayable',
      'type': 'function'
    }
  ]).at(registrarAddress);

  const hash = `0x${sha3(domain.split('.')[0])}`;

  return new Promise(resolve => {
    registrar.finalizeAuction(hash, (error, result) => {
      dispatch(receiveFinalize());

      if (error) return resolve(dispatch(notifyError(error.message)));

      return resolve(dispatch(notifyTx(result, '', { type: txTypes.FINALIZE_AUCTION, name: domain }, () => authenticate(domain, window.web3.eth.accounts[0]))));
    });
  });
};
