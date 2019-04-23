import { requestResolve, receiveResolve, errorResolve } from './actions';
import { hash as namehash } from 'eth-ens-namehash';
import { rns as rnsAddress } from '../../../config/contracts';

export const resolveAddress = domain => dispatch => {
  if (!domain) {
    dispatch(receiveResolve(''));
    return;
  }

  dispatch(requestResolve());

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
    if (error) return dispatch(errorResolve(error.message));

    const resolver = window.web3.eth.contract([
      {
        'constant': true,
        'inputs': [
          { 'name': 'node', 'type': 'bytes32' }
        ],
        'name': 'addr',
        'outputs': [
          { 'name': '', 'type': 'address' }
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function'
      },
      {
        'constant': true,
        'inputs': [
          { 'name': 'interfaceID', 'type': 'bytes4' }
        ],
        'name': 'supportsInterface',
        'outputs': [
          { 'name': '', 'type': 'bool' }
        ],
        'payable': false,
        'stateMutability': 'pure',
        'type': 'function'
      },
    ]).at(result);

    resolver.supportsInterface('0x3b3b57de', (error, result) => {
      if (error) return dispatch(errorResolve(error.message));

      if (!result) return dispatch(errorResolve('Resolver does not support address interface'));

      return new Promise(resolve => {
        resolver.addr(hash, (error, result) => {
          if (error) return resolve(dispatch(errorResolve(error.message)));
          return resolve(dispatch(receiveResolve(result)));
        });
      });
    });
  });
};
