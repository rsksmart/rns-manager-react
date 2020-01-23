import Web3 from 'web3';
import { hash as namehash } from 'eth-ens-namehash';
import { rskNode } from '../../adapters/nodeAdapter';
import { rnsAbi } from './abis.json';
import { rns as rnsAddress } from '../../adapters/configAdapter';

export const getRnsField = (field, name) => {
  const web3 = new Web3(rskNode);

  const rns = new web3.eth.Contract(rnsAbi, rnsAddress);

  const hash = namehash(name);

  return rns.methods[field](hash).call();
};

export const getSubdomainOwner = (domain, label) => {
  const name = `${label}.${domain}`;

  return getRnsField('owner', name);
};
