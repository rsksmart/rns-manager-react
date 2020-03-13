import Web3 from 'web3';
import { keccak_256 as sha3 } from 'js-sha3';
import { hash as namehash } from 'eth-ens-namehash';

import {
  rnsAbi,
} from './abis.json';

import {
  rns as registryAddress,
} from '../../../adapters/configAdapter';
import { gasPrice as defaultGasPrice } from '../../../adapters/gasPriceAdapter';
import transactionListener from '../../../helpers/transactionListener';
import {
  requestNewSubdomain, receiveNewSubdomain, errorNewSubdomain, addSubdomainToList,
  clearSubdomainList,
} from './actions';

const web3 = new Web3(window.ethereum);
const registry = new web3.eth.Contract(
  rnsAbi, registryAddress, { gasPrice: defaultGasPrice },
);

export const newSubDomain = (parentDomain, subdomain, newOwner) => async (dispatch) => {
  console.log(parentDomain, subdomain, newOwner);
  dispatch(requestNewSubdomain(subdomain));

  const accounts = await window.ethereum.enable();
  const currentAddress = accounts[0];

  const label = `0x${sha3(subdomain)}`;
  const node = namehash(parentDomain);

  return new Promise((resolve) => {
    registry.methods.setSubnodeOwner(node, label, newOwner).send(
      { from: currentAddress },
      (error, result) => {
        if (error) {
          return resolve(dispatch(errorNewSubdomain(error.message)));
        }

        return resolve(transactionListener(result, () => {
          dispatch(receiveNewSubdomain(subdomain));
        }));
      },
    );
  });
};



export const getSubdomainOwner = (domain, subdomain) => (dispatch) => {
  const hash = namehash(`${subdomain}.${domain}`);

  return new Promise((resolve) => {
    registry.methods.owner(hash).call((error, result) => {
      if (error) {
        // console.log('handle error')';
      }

      resolve(dispatch(addSubdomainToList(subdomain, result)));
    });
  });
};

export const getSubdomainListFromLocalStorage = domain => (dispatch) => {
  dispatch(clearSubdomainList());

  const storedSubdomains = JSON.parse(localStorage.getItem('subdomains'));

  if (!storedSubdomains || !storedSubdomains[domain]) {
    return null;
  }

  return storedSubdomains[domain].forEach((subdomain) => {
    dispatch(getSubdomainOwner(domain, subdomain));
  });
};
