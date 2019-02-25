import { requestResolveAddress, receiveResolveAddress } from './actions'
import { hash as namehash } from 'eth-ens-namehash'

export const resolveAddress = domain => dispatch => {
  dispatch(requestResolveAddress(domain));

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
  ]).at('0x4efd25e3d348f8f25a14fb7655fba6f72edfe93a');

  const hash = namehash(domain);

  return new Promise((resolve, reject) => {
    resolver.addr(hash, (error, result) => {
      if(error) reject(error);

      dispatch(receiveResolveAddress(result));

      resolve(result);
    });
  });
}
