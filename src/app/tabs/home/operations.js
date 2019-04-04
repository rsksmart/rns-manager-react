import { requestResolveAddress, receiveResolveAddress, } from './actions';
import { hash as namehash } from 'eth-ens-namehash';
import { resolver as resolverAddress } from '../../../config/contracts';
import { notifyError } from '../../notifications';

export const resolveAddress = domain => dispatch => {
  dispatch(requestResolveAddress());

  const resolver = window.web3.eth.contract([
    {
      "constant": true,
      "inputs": [
          { "name": "node", "type": "bytes32" }
      ],
      "name": "addr",
      "outputs": [
          { "name": "", "type": "address" }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ]).at(resolverAddress);

  const hash = namehash(domain);

  return new Promise(resolve => {
    resolver.addr(hash, (error, result) => {
      if(error) return resolve(dispatch(notifyError(error.message)));
      return resolve(dispatch(receiveResolveAddress(result)));
    });
  });
};
