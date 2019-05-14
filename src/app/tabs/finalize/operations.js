import { requestFinalize, receiveFinalize } from './actions';
import config from '../../../config/contracts';
import { keccak_256 as sha3 } from 'js-sha3';
import { notifyTx, notifyError, txTypes } from '../../notifications';
import { authenticate } from '../../auth';


export const finalize = domain => dispatch => {
  dispatch(requestFinalize());
  const { registrar: registrarAddress } = config('app/tabs/finalize/operations');

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

      return resolve(dispatch(notifyTx(result, '', { type: txTypes.FINALIZE_AUCTION, name: domain, addr: window.web3.eth.accounts[0] }, () => authenticate(domain, window.web3.eth.accounts[0]))));
    });
  });
};
