import { keccak_256 as sha3 } from 'js-sha3';
import { requestStartAuction, receiveStartAuction } from './actions';
import { registrar as registrarAddress } from '../../../config/contracts';
import { notifyTx, notifyError, txTypes } from '../../notifications';
import abi from './abi.json';

export default domain => (dispatch) => {
  const registrar = window.web3.eth.contract(abi).at(registrarAddress);

  dispatch(requestStartAuction());

  const hash = `0x${sha3(domain.split('.')[0])}`;

  return new Promise((resolve) => {
    registrar.startAuction(hash, (error, result) => {
      dispatch(receiveStartAuction());

      if (error) return resolve(dispatch(notifyError(error.message)));

      return resolve(dispatch(notifyTx(result, 'Auction started!', { type: txTypes.START_AUCTION, name: domain })));
    });
  });
};
