import { hash as namehash } from 'eth-ens-namehash';
import Web3 from 'web3';
import { keccak_256 as sha3 } from 'js-sha3';
import {
  owner, resolver, ttl,
  addSubdomain as addSubdomainAction, receiveSubdomainOwner, clearSubdomains,
  requestSetSubdomainOwner, receiveSetSubdomainOwner,
  requestGetReverse, receiveGetReverse, requestSetReverse, receiveSetReverse, errorSetReverse,
  fifsMigrationCheckIfSubdomain, requestCheckFifsMigration, receiveCheckFifsMigration,
  requestFifsMigration, receiveFifsMigration, errorFifsMigration, errorCheckFifsMigration,
} from './actions';
import {
  rns as registryAddress,
  reverseRegistrar as reverseRegistryAddress,
  nameResolver as nameResolverAddress,
  registrar as tokenRegistrarAddress,
  gasPrice as defaultGasPrice,
} from '../../../config/contracts';
import {
  notifyTx, notifyError, txTypes, checkResolver,
} from '../../notifications';
import { get, set } from '../../factories/operationFactory';
import {
  rnsAbi, reverseAbi, nameResolverAbi, tokenRegistrarAbi,
} from './abis';

const web3 = new Web3(window.ethereum);
const registry = new web3.eth.Contract(
  rnsAbi, registryAddress, { gasPrice: defaultGasPrice },
);
const nameResolver = new web3.eth.Contract(
  nameResolverAbi, nameResolverAddress, { gasPrice: defaultGasPrice },
);
const tokenRegistrar = new web3.eth.Contract(
  tokenRegistrarAbi, tokenRegistrarAddress, { gasPrice: defaultGasPrice },
);
const reverseRegistry = new web3.eth.Contract(
  reverseAbi, reverseRegistryAddress, { gasPrice: defaultGasPrice },
);

export const getDomainOwner = get(owner.requestGet, owner.receiveGet, registry.methods.owner);
export const getDomainResolver = get(
  resolver.requestGet,
  resolver.receiveGet,
  registry.methods.resolver,
);
export const getDomainTtl = get(ttl.requestGet, ttl.receiveGet, registry.methods.ttl);

export const setDomainOwner = set(
  owner.requestSet,
  owner.receiveSet,
  txTypes.SET_OWNER,
  registry.methods.setOwner,
  getDomainOwner,
);
export const setDomainResolver = set(
  resolver.requestSet,
  resolver.receiveSet,
  txTypes.SET_RESOLVER,
  registry.methods.setResolver,
  name => (dispatch) => {
    dispatch(getDomainResolver(name));
    dispatch(checkResolver(name));
  },
);
export const setDomainTtl = set(
  ttl.requestSet,
  ttl.receiveSet,
  txTypes.SET_TTL,
  registry.methods.setTTL,
  getDomainTtl,
);

const displaySubdomain = (domain, subdomain) => (dispatch) => {
  const hash = namehash(`${subdomain}.${domain}`);

  return new Promise((resolve, reject) => {
    registry.methods.owner(hash).call((error, result) => {
      if (error) reject(dispatch(notifyError(error.message)));

      dispatch(receiveSubdomainOwner(subdomain, result));

      resolve(result);
    });
  });
};

export const loadSubdomains = domain => (dispatch) => {
  dispatch(clearSubdomains());
  const storedSubdomains = JSON.parse(localStorage.getItem('subdomains'));

  if (!storedSubdomains || !storedSubdomains[domain]) return;

  const subdomains = storedSubdomains[domain];

  for (let i = 0; i < subdomains.length; i += 1) {
    dispatch(addSubdomainAction(subdomains[i]));
    dispatch(displaySubdomain(domain, subdomains[i]));
  }
};

export const addSubdomain = (domain, subdomain) => (dispatch) => {
  if (!subdomain) return;

  dispatch(addSubdomainAction(subdomain));

  let storedSubdomains = JSON.parse(localStorage.getItem('subdomains'));
  if (!storedSubdomains) storedSubdomains = {};
  if (!storedSubdomains[domain]) storedSubdomains[domain] = [];
  storedSubdomains[domain].push(subdomain);
  localStorage.setItem('subdomains', JSON.stringify(storedSubdomains));

  dispatch(displaySubdomain(domain, subdomain));
};

export const setSubdomainOwner = (parent, child, _owner, sender) => (dispatch) => {
  dispatch(requestSetSubdomainOwner(child));

  const label = `0x${sha3(child)}`;
  const node = namehash(parent);

  return new Promise((resolve) => {
    registry.methods.setSubnodeOwner(node, label, _owner).send(
      { from: sender },
      (error, result) => {
        dispatch(receiveSetSubdomainOwner(child));
        if (error) return resolve(dispatch(notifyError(error.message)));
        return resolve(dispatch(notifyTx(result, '', { type: txTypes.SET_SUBNODE_OWNER, name: `${child}.${parent}`, owner: _owner }, () => displaySubdomain(parent, child))));
      },
    );
  });
};

export const getReverseResolution = address => (dispatch) => {
  const name = `${address.toLowerCase().slice(2)}.addr.reverse`;

  dispatch(requestGetReverse());

  const hash = namehash(name);

  return new Promise((resolve) => {
    nameResolver.methods.name(hash).call((error, nameResolution) => {
      if (error) return resolve(dispatch(notifyError(error.message)));
      return resolve(dispatch(receiveGetReverse(nameResolution)));
    });
  });
};

export const setReverseResolution = (name, sender) => (dispatch) => {
  dispatch(requestSetReverse());

  return new Promise((resolve) => {
    reverseRegistry.methods.setName(name).send(
      { from: sender },
      (error, result) => {
        if (error) {
          dispatch(errorSetReverse());
          return resolve(dispatch(notifyError(error.message)));
        }
        dispatch(receiveSetReverse(name));
        return resolve(dispatch(notifyTx(result, '', { type: txTypes.SET_REVERSE_RESOLUTION, name })));
      },
    );
  });
};

export const checkIfSubdomainOrMigrated = name => (dispatch) => {
  const labelsAmount = name.split('.').length;

  if (labelsAmount > 2) {
    return Promise.resolve(dispatch(fifsMigrationCheckIfSubdomain(true)));
  }

  dispatch(requestCheckFifsMigration());

  return new Promise((resolve) => {
    const label = `0x${sha3(name.split('.')[0])}`;

    tokenRegistrar.methods.entries(label).call((error, result) => {
      if (error) {
        dispatch(errorCheckFifsMigration());
        return resolve(dispatch(notifyError(error.message)));
      }

      const deed = result[1];

      return resolve(dispatch(receiveCheckFifsMigration(deed === '0x0000000000000000000000000000000000000000')));
    });
  });
};

export const migrateToFifsRegistrar = (name, sender) => (dispatch) => {
  dispatch(requestFifsMigration());

  return new Promise((resolve) => {
    const label = `0x${sha3(name.split('.')[0])}`;

    tokenRegistrar.methods.transferRegistrars(label).send(
      { from: sender },
      (error, result) => {
        if (error) {
          dispatch(errorFifsMigration());
          return resolve(dispatch(notifyError(error.message)));
        }
        dispatch(receiveFifsMigration());
        return resolve(dispatch(notifyTx(result, '', { type: txTypes.MIGRATE_FIFS_REGISTRAR, name })));
      },
    );
  });
};
