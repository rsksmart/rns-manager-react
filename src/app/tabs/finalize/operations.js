import { requestFinalize, receiveFinalize } from './actions';
import { addTxError } from '../../actions';
import { confirmedTx } from '../../operations';
import { registrar as registrarAddress } from '../../../config/contracts.json';
import { keccak_256 as sha3 } from 'js-sha3';

export const finalize = domain => dispatch => {
  dispatch(requestFinalize());

  const registrar = window.web3.eth.contract([
    {
      "constant": false,
      "inputs": [
        { "name": "_hash", "type": "bytes32" }
      ],
      "name": "finalizeAuction",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]).at(registrarAddress);

  const hash = `0x${sha3(domain.split('.')[0])}`;

  return new Promise(resolve => {
    registrar.finalizeAuction(hash, (error, result) => {
      dispatch(receiveFinalize());
      if (error) return resolve(dispatch(addTxError(error.message)));
      return resolve(dispatch(confirmedTx(result)));
    });
  });
};
