import { requestGetCost, receiveGetCost } from './actions';
import { fifsRegistrar as fifsRegistrarAddress } from '../../../config/contracts';
import { notifyError } from '../../notifications';
import abi from './abi.json';

export default (domain, duration) => (dispatch) => {
  const registrar = window.web3.eth.contract(abi).at(fifsRegistrarAddress);

  dispatch(requestGetCost());

  return new Promise((resolve) => {
    registrar.getCost(domain, duration, duration, (error, result) => {
      if (error) return resolve(dispatch(notifyError(error.message)));

      return dispatch(receiveGetCost(window.web3.toDecimal(result)));
    });
  });
};
