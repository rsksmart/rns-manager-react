import { keccak_256 as sha3 } from 'js-sha3';
import { requestBid, receiveBid } from './actions';
import { rif as rifAddress, registrar as registrarAddress } from '../../../config/contracts.json';
import { notifyTx, notifyError, txTypes } from '../../notifications';
import registrarAbi from './registrarAbi';
import rifAbi from './rifAbi';

export default (domain, value, salt) => (dispatch) => {
  dispatch(requestBid());

  const registrar = window.web3.eth.contract(registrarAbi).at(registrarAddress);

  const rif = window.web3.eth.contract(rifAbi).at(rifAddress);

  const hash = `0x${sha3(domain.split('.')[0])}`;
  const owner = window.web3.eth.accounts[0];
  const tokens = value * (10 ** 18);

  return new Promise((resolve) => {
    registrar.shaBid(hash, owner, tokens, salt, (shaBidError, shaBidResult) => {
      if (shaBidError) {
        dispatch(receiveBid());
        return resolve(dispatch(notifyError(shaBidError.message)));
      }

      return rif.transferAndCall(registrarAddress, tokens, `0x1413151f${shaBidResult.slice(2)}`, (error, result) => {
        if (error) {
          dispatch(receiveBid());
          return resolve(dispatch(notifyError(error.message)));
        }

        return registrar.entries(hash, (entriesError, entriesResult) => {
          if (error) {
            dispatch(receiveBid());
            return resolve(dispatch(notifyError(entriesError.message)));
          }

          const registrationDate = entriesResult[2].toNumber();

          dispatch(receiveBid());

          return resolve(dispatch(notifyTx(result, '', {
            type: txTypes.BID_AUCTION, name: domain, value, salt, registrationDate,
          })));
        });
      });
    });
  });
};
