import { hash as namehash } from 'eth-ens-namehash';
import { rns as registryAddress } from '../adapters/configAdapter';
import { checkResolver } from '../notifications';

import {
  receiveHasMetamask,
  requestEnable,
  receiveEnable,
  requestLogin,
  receiveLogin,
  errorLogin,
  errorEnable,
} from './actions';
import { push } from 'connected-react-router';

export const start = callback => (dispatch) => {
  const hasMetamask = window.ethereum !== undefined;

  dispatch(receiveHasMetamask(hasMetamask));

  if (hasMetamask) {
    dispatch(requestEnable());

    window.ethereum.enable()
      .then(accounts => dispatch(receiveEnable(
        accounts[0],
        window.ethereum.publicConfigStore.getState().networkVersion,
        window.ethereum.publicConfigStore.getState().networkVersion
          === process.env.REACT_APP_ENVIRONMENT_ID,
      )))
      .then(() => callback && callback())
      .catch(e => dispatch(errorEnable(e.message)));
  }
};

export const authenticate = (name, address) => (dispatch) => {
  dispatch(requestLogin());
  localStorage.setItem('name', name);

  const registry = window.web3.eth.contract([
    {
      constant: true,
      inputs: [
        { name: 'node', type: 'bytes32' },
      ],
      name: 'owner',
      outputs: [
        { name: '', type: 'address' },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
  ]).at(registryAddress);

  const hash = namehash(name);

  return new Promise((resolve) => {
    registry.owner(hash, (error, result) => {
      if (error) return resolve(dispatch(errorLogin(error)));

      if (address !== result) return resolve(dispatch(receiveLogin(name, false)));

      dispatch(checkResolver(name));

      dispatch(push('/admin'));

      return resolve(dispatch(receiveLogin(name, true)));
    });
  });
};
