import { requestResolveAddress, receiveResolveAddress, } from './actions';
import { hash as namehash } from 'eth-ens-namehash';
import config from '../../../config/contracts';
import { notifyError } from '../../notifications';


export const resolveAddress = domain => dispatch => {
  dispatch(requestResolveAddress());
  const { rns: rnsAddress  } = config('app/tabs/home/operations');

  const rns = window.web3.eth.contract([
    {
      'constant': true,
      'inputs': [
        { 'name': 'node', 'type': 'bytes32' }
      ],
      'name': 'resolver',
      'outputs': [
        { 'name': '', 'type': 'address' }
      ],
      'payable': false,
      'stateMutability': 'view',
      'type': 'function'
    }
  ]).at(rnsAddress);

  const hash = namehash(domain);

  rns.resolver(hash, (error, result) => {
    if (error) return dispatch(notifyError(error.message));

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
    ]).at(result);

    return new Promise(resolve => {
      resolver.addr(hash, (error, result) => {
        if(error) return resolve(dispatch(notifyError(error.message)));
        return resolve(dispatch(receiveResolveAddress(result)));
      });
    });
  });
};
