import { requestStartAuction, receiveStartAuction } from './actions';
import { keccak_256 as sha3 } from 'js-sha3';
import config from '../../../config/contracts';
import { notifyTx, notifyError, txTypes } from '../../notifications';


export const startAuction = domain => dispatch => {
  const { registrar: registrarAddress } = config('app/tabs/startAuction/operations');
  const registrar = window.web3.eth.contract([
    {
      'constant': false,
      'inputs': [
        { 'name': '_hash', 'type': 'bytes32' }
      ],
      'name': 'startAuction',
      'outputs': [],
      'payable': false,
      'stateMutability': 'nonpayable',
      'type': 'function'
    }
  ]).at(registrarAddress);

  dispatch(requestStartAuction());

  let hash = `0x${sha3(domain.split('.')[0])}`;

  return new Promise((resolve) => {
    registrar.startAuction(hash, (error, result) => {
      dispatch(receiveStartAuction());

      if (error) return resolve(dispatch(notifyError(error.message)));

      return resolve(dispatch(notifyTx(result, 'Auction started!', { type: txTypes.START_AUCTION, name: domain })));
    });
  });
};
