import { requestAuthDomain , receiveAuthDomain, errorAuthDomain, displayAuthModal } from './actions';
import { rns as registryAddress } from '../../config/contracts';
import { hash as namehash } from 'eth-ens-namehash';

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
]).at(registryAddress);

export const authenticate = (domain, address) => dispatch => {
  dispatch(requestAuthDomain());

  const hash = namehash(domain);

  return new Promise(resolve => {
    registry.owner(hash, (error, result) => {
      if(error) return resolve(dispatch(errorAuthDomain(error.message)));
      if(address !== result) return resolve(dispatch(errorAuthDomain('You are not the domain owner!')));
      dispatch(displayAuthModal());
      return resolve(dispatch(receiveAuthDomain(domain)));
    });
  });
};
