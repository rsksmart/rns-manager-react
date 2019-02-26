import {
  requestDomainOwner, receiveDomainOwner
} from './actions';
import { hash as namehash } from 'eth-ens-namehash';

export const getDomainOwner = domain => dispatch => {
  if (!domain) {
    dispatch(receiveDomainOwner(''));
    return;
  }

  dispatch(requestDomainOwner(domain));

  const registry = window.web3.eth.contract([
    {
      "constant": true,
      "inputs": [
        { "name": "node", "type": "bytes32" }
      ],
      "name": "owner",
      "outputs": [
        { "name": "", "type": "address" }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ]).at('0xcb868aeabd31e2b66f74e9a55cf064abb31a4ad5');

  const hash = namehash(domain);

  return new Promise((resolve, reject) => {
    registry.owner(hash, (error, result) => {
      if(error) reject(error);

      dispatch(receiveDomainOwner(result));

      resolve(result);
    });
  });
}
