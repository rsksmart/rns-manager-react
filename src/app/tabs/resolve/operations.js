import { requestResolve, receiveResolve, errorResolve, requestChainResolve, receiveChainResolve, errorChainResolve } from './actions';
import { hash as namehash } from 'eth-ens-namehash';
import config from '../../../config/contracts';

export const resolveAddress = domain => dispatch => {
  if (!domain) {
    dispatch(receiveResolve(''));
    return;
  }

  dispatch(requestResolve());

  const { rns: rnsAddress } = config('app/tabs/resolve/operations');
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

  rns.resolver(hash, (error, resolverAddress) => {
    if (error) return dispatch(errorResolve(error.message));

    const abnstractResolver = window.web3.eth.contract([
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
      }
    ]).at(resolverAddress);

    abnstractResolver.supportsInterface('0x3b3b57de', (error, isAddrResolver) => {
      if (error) return dispatch(errorResolve(error.message));

      if (!isAddrResolver) return dispatch(errorResolve('Resolver does not support address interface'));

      abnstractResolver.supportsInterface('0x8be4b5f6', (error, isMultiChainResolver) => {
        if (error) return dispatch(errorResolve(error.message));

        const addrResolver = window.web3.eth.contract([
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
          }
        ]).at(resolverAddress);

        if (isMultiChainResolver) dispatch(resolveChainAddr(resolverAddress, '0x00000000', domain))

        return new Promise(resolve => {
          addrResolver.addr(hash, (error, addr) => {
            if (error) return resolve(dispatch(errorResolve(error.message)));
            return resolve(dispatch(receiveResolve(addr, resolverAddress, isMultiChainResolver)));
          });
        });
      })
    });
  });
};

export const resolveChainAddr = (resolverAddress, chainId, name) => dispatch => {
  dispatch(requestChainResolve());

  const multiChainResolver = window.web3.eth.contract([
    {
      "constant": true,
      "inputs": [
        {
          "name": "node",
          "type": "bytes32"
        },
        {
          "name": "chain",
          "type": "bytes4"
        }
      ],
      "name": "chainAddr",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0x8be4b5f6"
    }
  ]).at(resolverAddress);

  const hash = namehash(name);

  return new Promise(resolve => {
    multiChainResolver.chainAddr(hash, chainId, (error, addr) => {
      if (error) return resolve(dispatch(errorChainResolve(error.message)));
      return resolve(dispatch(receiveChainResolve(addr)));
    });
  });
};
