import { requestUnseal, receiveUnseal } from './actions';
import { registrar as registrarAddress } from '../../../config/contracts.json';
import { keccak_256 as sha3 } from 'js-sha3';
import { notifyTx, notifyError, txTypes } from '../../notifications';

export const unseal = (domain, value, salt) => dispatch => {
  dispatch(requestUnseal());

  const registrar = window.web3.eth.contract([
    {
      'constant': false,
      'inputs': [
        { 'name': '_hash', 'type': 'bytes32' },
        { 'name': '_value', 'type': 'uint256' },
        { 'name': '_salt', 'type': 'bytes32' }
      ],
      'name': 'unsealBid',
      'outputs': [],
      'payable': false,
      'stateMutability': 'nonpayable',
      'type': 'function'
    },
    {
      'constant': true,
      'inputs': [
        { 'name': '_hash', 'type': 'bytes32' }
      ],
      'name': 'entries',
      'outputs': [
        { 'name': '', 'type': 'uint8' },
        { 'name': '', 'type': 'address' },
        { 'name': '', 'type': 'uint256' },
        { 'name': '', 'type': 'uint256' },
        { 'name': '', 'type': 'uint256' }
      ],
      'payable': false,
      'stateMutability': 'view',
      'type': 'function'
    }
  ]).at(registrarAddress);

  let hash = `0x${sha3(domain.split('.')[0])}`;
  let tokens = value * (10 ** 18);

  return new Promise(resolve => {
    registrar.unsealBid(hash, tokens, salt, (error, result) => {
      if (error) {
        dispatch(receiveUnseal());
        return resolve(dispatch(notifyError(error.message)));
      }

      registrar.entries(hash, (entriesError, entriesResult) => {
        if (error) return resolve(dispatch(notifyError(entriesError.message)));

        const registrationDate = entriesResult[2].toNumber();

        return resolve(dispatch(notifyTx(result, '', { type: txTypes.UNSEAL_AUCTION, domain, registrationDate })));
      });
    });
  });
};
