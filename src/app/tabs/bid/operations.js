import { requestBid, receiveBid } from './actions';
import { rif as rifAddress, registrar as registrarAddress } from '../../../config/contracts.json';
import { keccak_256 as sha3 } from 'js-sha3';
import { notifyTx, notifyError, txTypes } from '../../notifications';

export const bid = (domain, value) => dispatch => {
  dispatch(requestBid());

  const registrar = window.web3.eth.contract([
    {
      "constant": true,
      "inputs": [
        { "name": "_hash", "type": "bytes32" },
        { "name": "_owner", "type": "address" },
        { "name": "_value", "type": "uint256" },
        { "name": "_salt", "type": "bytes32" }
      ],
      "name": "shaBid",
      "outputs": [
        { "name": "", "type": "bytes32" }
      ],
      "payable": false,
      "stateMutability": "pure",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        { "name": "_hash", "type": "bytes32" }
      ],
      "name": "entries",
      "outputs": [
        { "name": "", "type": "uint8" },
        { "name": "", "type": "address" },
        { "name": "", "type": "uint256" },
        { "name": "", "type": "uint256" },
        { "name": "", "type": "uint256" }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ]).at(registrarAddress);

  const rif = window.web3.eth.contract([
    {
      "constant": false,
      "inputs": [
          { "name": "_to", "type": "address" },
          { "name": "_value", "type": "uint256" },
          { "name": "data", "type": "bytes" }
      ],
      "name": "transferAndCall",
      "outputs": [
          { "name": "", "type": "bool" }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]).at(rifAddress);

  const hash = `0x${sha3(domain.split('.')[0])}`;
  const owner = window.web3.eth.accounts[0];
  const tokens = value * (10 ** 18);
  const salt = 0;

  return new Promise((resolve) => {
    registrar.shaBid(hash, owner, tokens, salt, (shaBidError, shaBidResult) => {
      if (shaBidError) {
        dispatch(receiveBid());
        return resolve(dispatch(notifyError(shaBidError.message)));
      }

      rif.transferAndCall(registrarAddress, tokens, `0x1413151f${shaBidResult.slice(2)}`, (error, result) => {
        if (error) {
          dispatch(receiveBid());
          return resolve(dispatch(notifyError(error.message)));
        }

        registrar.entries(hash, (entriesError, entriesResult) => {
          if (error) return resolve(dispatch(notifyError(entriesError.message)));

          const registrationDate = entriesResult[2].toNumber();

          return resolve(dispatch(notifyTx(result, '', { type: txTypes.BID_AUCTION, domain, registrationDate })));
        });
      });
    });
  });
};
