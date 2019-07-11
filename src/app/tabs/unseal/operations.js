import { keccak_256 as sha3 } from 'js-sha3';
import { requestUnseal, receiveUnseal } from './actions';
import { registrar as registrarAddress } from '../../../config/contracts.json';
import { notifyTx, notifyError, txTypes } from '../../notifications';
import abi from './abi';

export default (domain, value, salt) => (dispatch) => {
  dispatch(requestUnseal());

  const registrar = window.web3.eth.contract(abi).at(registrarAddress);

  const hash = `0x${sha3(domain.split('.')[0])}`;
  const tokens = value * (10 ** 18);

  return new Promise((resolve) => {
    registrar.unsealBid(hash, tokens, salt, (error, result) => {
      if (error) {
        dispatch(receiveUnseal());
        return resolve(dispatch(notifyError(error.message)));
      }

      return registrar.entries(hash, (entriesError, entriesResult) => {
        if (error) return resolve(dispatch(notifyError(entriesError.message)));

        const registrationDate = entriesResult[2].toNumber();

        return resolve(dispatch(notifyTx(result, '', { type: txTypes.UNSEAL_AUCTION, name: domain, registrationDate })));
      });
    });
  });
};
