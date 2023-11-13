import { hash as namehash } from '@ensdomains/eth-ens-namehash';
import { deflateSync } from 'react-zlib-js';
import cbor from 'cbor';
import { ethers } from 'ethers';
import { validateBytes32 } from '../../../validations';
import {
  requestResolver, receiveResolver, requestSetResolver, receiveSetResolver, errorSetResolver,
  waitingSetResolver, requestContent, receiveContent, errorContent, requestSetContent,
  receiveSetContent, errorSetContent, requestSupportedInterfaces, errorDecodingAddress,
  requestMigrateAddresses, receiveMigrateAddresses, errorMigrateWithAddresses,
  receiveSupportedInterfaces,
} from './actions';
import { getAllChainAddresses, getIndexById, getChainNameById } from '../addresses/operations';

import {
  multiChainResolver as multiChainResolverAddress,
  publicResolver as publicResolverAddress,
  stringResolver as stringResolverAddress,
  definitiveResolver as definitiveResolverAddress,
  rns as rnsAddress,
} from '../../../adapters/configAdapter';
import { sendBrowserNotification } from '../../../browerNotifications/operations';

import {
  MULTICHAIN_RESOLVER, PUBLIC_RESOLVER, STRING_RESOLVER, UNKNOWN_RESOLVER,
  CONTENT_BYTES, CONTENT_BYTES_BLANK, DEFINITIVE_RESOLVER, CONTENT_HASH,
  MULTICHAIN, MULTICOIN, CONTRACT_ABI, ADDR,
} from './types';

import { resolverAbi, abstractResolverAbi } from './abis.json';
import { rnsAbi } from '../../resolve/abis.json';
import dRA from './definitiveAbis.json';
import { interfaces } from './supportedInterfaces.json';
import { EMPTY_ADDRESS } from '../types';
import { addressDecoder } from '../helpers';
import getSigner from '../../../helpers/getSigner';
import { rns } from '../../../rns-sdk';
import { contentHash as CH, setContentHash as setCH } from '../../../helpers/contentHash';
import getProvider from '../../../helpers/getProvider';

const { definitiveResolverAbi } = dRA;

/**
 * Returns user friendly name based on address
 * @param {address} address the resolver address
 */
export const getResolverNameByAddress = (resolverAddr) => {
  switch (resolverAddr.toLowerCase()) {
    case multiChainResolverAddress:
      return MULTICHAIN_RESOLVER;
    case publicResolverAddress:
      return PUBLIC_RESOLVER;
    case stringResolverAddress:
      return STRING_RESOLVER;
    case definitiveResolverAddress:
      return DEFINITIVE_RESOLVER;
    default:
      return UNKNOWN_RESOLVER;
  }
};

export const getContentHash = domain => async (dispatch) => {
  dispatch(requestContent(CONTENT_HASH));

  try {
    const rnsContract = new ethers.Contract(rnsAddress, rnsAbi, getProvider());
    const hash = namehash(domain);
    const resolverAddress = await rnsContract.resolver(hash);
    const result = await CH(resolverAddress, domain, definitiveResolverAbi);
    return dispatch(
      receiveContent(
        CONTENT_HASH,
        `${result.protocolType}://${result.decoded}`,
        false,
      ),
    );
  } catch (error) {
    return dispatch(receiveContent(CONTENT_HASH, null, true));
  }
};

/**
 * Get the content Bytes from the given resolver
 * @param {address} resolverAddress to be queried
 * @param {string} domain
 * @param {const} type either CONTENT_BYTES or CONTENT_HASH
 */
export const getContentBytes = (resolverAddress, domain) => async (dispatch) => {
  dispatch(requestContent(CONTENT_BYTES));

  const resolver = new ethers.Contract(resolverAddress, resolverAbi, getProvider());

  const hash = namehash(domain);

  try {
    const value = await resolver.content(hash);
    return dispatch(
      receiveContent(
        CONTENT_BYTES,
        (value === CONTENT_BYTES_BLANK || !value) ? '' : value,
        (value === CONTENT_BYTES_BLANK || !value),
      ),
    );
  } catch (error) {
    return dispatch(errorContent(CONTENT_BYTES, error));
  }
};

/**
 * Querys the blockchain for all four encodings of contract ABI and returns values
 * @param {address} resolverAddress address of the domain's resolver
 * @param {domain} domain domain associated with the ABI.
 */
const getContractAbi = (resolverAddress, domain) => async (dispatch) => {
  dispatch(requestContent(CONTRACT_ABI));
  const hash = namehash(domain);

  const resolver = new ethers.Contract(resolverAddress, definitiveResolverAbi, getProvider());

  const promiseArray = [];
  [1, 2, 4, 8].forEach(async (id) => {
    promiseArray.push(
      new Promise((resolve) => {
        resolver.ABI(hash, id)
          .then(result => resolve({
            id,
            result: (result[1] !== '0x00' && result[1]) ? result[1] : null,
          }));
      }),
    );
  });

  Promise.all(promiseArray).then((values) => {
    const hasValues = values
      .filter(item => item.result !== null && parseInt(item.result, 16) !== 0).length;
    dispatch(receiveContent(CONTRACT_ABI, values, !hasValues));
  });
};

/**
 * Loops through manager's supported interfaces and checks if resolver also supports them.
 * @param {address} resolverAddress
 * @param {string} domain
 */
export const supportedInterfaces = (resolverAddress, domain) => async (dispatch) => {
  dispatch(requestSupportedInterfaces());
  // const web3 = new Web3(window.rLogin);
  // const abstractResolver = new web3.eth.Contract(abstractResolverAbi, resolverAddress);
  const signer = await getSigner();
  const abstractResolver = new ethers.Contract(resolverAddress, abstractResolverAbi, signer);

  // loop throgh supported interfaces and if found, call 'get' function.
  // only calls MULTICHAIN on the resolver page for the migration component
  // multicoin data is not needed on this page.
  interfaces.forEach((i) => {
    abstractResolver
      .supportsInterface(i.interfaceId)
      .then((supportsInterface) => {
        if (supportsInterface) {
          switch (i.name) {
            case CONTENT_BYTES:
              return dispatch(getContentBytes(resolverAddress, domain));
            case CONTENT_HASH:
              return dispatch(getContentHash(domain));
            case MULTICHAIN:
            case MULTICOIN:
            case ADDR:
              return dispatch(getAllChainAddresses(
                domain, getResolverNameByAddress(resolverAddress),
              ));
            case CONTRACT_ABI:
              return (dispatch(getContractAbi(resolverAddress, domain)));
            default:
          }
        }
        return null;
      })
      .then(() => dispatch(receiveSupportedInterfaces()));
  });
};

/**
 * Gets the resolver for a specified domain
 * @param {string} domain the domain to get the resolver address
 */
export const getDomainResolver = domain => async (dispatch) => {
  dispatch(requestResolver());

  const signer = await getSigner();

  const rnsSdk = rns(signer);

  try {
    const result = await rnsSdk.getResolver(domain);
    dispatch(receiveResolver(result, getResolverNameByAddress(result)));
    return dispatch(supportedInterfaces(result, domain));
  } catch (error) {
    return error;
  }
};

/**
 * Sets the resolver for a specified domain
 * @param {string} domain the domain to set
 * @param {address} resolverAddress the address to be set
 */
export const setDomainResolver = (domain, resolverAddress) => async (dispatch) => {
  dispatch(requestSetResolver());
  const lowerResolverAddress = resolverAddress.toLowerCase();

  const signer = await getSigner();
  const rnsSdk = rns(signer);

  try {
    const resultTx = await rnsSdk.setResolver(domain, lowerResolverAddress);
    await resultTx.wait();
    dispatch(waitingSetResolver());
    const resolverName = getResolverNameByAddress(lowerResolverAddress);
    dispatch(receiveSetResolver(resultTx.hash, lowerResolverAddress, resolverName));
    dispatch(getAllChainAddresses(domain, resolverName));
    dispatch(supportedInterfaces(lowerResolverAddress, domain));
    return sendBrowserNotification(domain, 'resolver_set_success');
  } catch (error) {
    return dispatch(errorSetResolver(error.message));
  }
};

/**
 * setContentHash using the JS Lib
 * @param {string} domain The domain to set content hash for
 * @param {string} input string input that should be sent
 */
export const setContentHash = (domain, input) => async (dispatch) => {
  dispatch(requestSetContent(CONTENT_HASH));
  try {
    const signer = await getSigner();
    const rnsContract = new ethers.Contract(rnsAddress, rnsAbi, signer);
    const resolverAddress = await rnsContract.resolver(namehash(domain));
    const result = await setCH(domain, input, resolverAddress, definitiveResolverAbi);
    dispatch(receiveSetContent(CONTENT_HASH, result, input, input === ''));
    return sendBrowserNotification(domain, 'record_set');
  } catch (error) {
    return dispatch(errorSetContent(CONTENT_HASH, error.message));
  }
};


/**
 * Sets the ContentBytes OR ContentHash for the domain
 * @param {address} resolverAddress address of the Resolver used
 * @param {string} domain to be associated with the data
 * @param {bytes32} input to be set, or empty to set blank
 * @param {const} type either CONTENT_BYTES or CONTENT_HASH
 */
const setContentBytes = (resolverAddress, domain, input) => async (dispatch) => {
  dispatch(requestSetContent(CONTENT_BYTES));

  const value = input !== '' ? input : CONTENT_BYTES_BLANK;

  // validation
  if (validateBytes32(input)) {
    return dispatch(errorSetContent(CONTENT_BYTES, validateBytes32(value)));
  }
  const signer = await getSigner();

  const resolver = new ethers.Contract(resolverAddress, resolverAbi, signer);

  try {
    const result = await resolver.setContent(namehash(domain), value);
    result.wait();
    dispatch(receiveSetContent(
      CONTENT_BYTES,
      result,
      (value === CONTENT_BYTES_BLANK) ? '' : value,
    ));
    return sendBrowserNotification(domain, 'record_set');
  } catch (error) {
    return dispatch(errorSetContent(CONTENT_BYTES, error.message));
  }
};

const setContractAbi = (resolverAddress, domain, value) => async (dispatch) => {
  dispatch(requestSetContent(CONTRACT_ABI));
  let dataSourceError;
  let parsedJson;
  const response = [];

  // get data by input method starting with URI:
  if (value.inputMethod === 'uri') {
    await fetch(encodeURI(value.uri))
      .then(res => res.json())
      .then((data) => {
        try {
          parsedJson = JSON.stringify(data);
        } catch (e) {
          dataSourceError = `Could not validate JSON from URI, ${e.message}`;
        }
      })
      .catch((e) => {
        dataSourceError = e.message;
      });
  } else if (value.inputMethod !== 'delete') {
    // get the data from the input form
    try {
      parsedJson = JSON.stringify(JSON.parse(value.jsonText));
    } catch (e) {
      dataSourceError = 'Could not validate JSON';
    }
  }

  if (dataSourceError) {
    return dispatch(errorSetContent(CONTRACT_ABI, dataSourceError));
  }

  const multiCallMethods = [];
  const signer = await getSigner();

  // type 1: uncompressed Json
  if (value.encodings.json && parsedJson !== '') {
    response.push({ id: 1, result: ethers.utils.hexlify(ethers.utils.toUtf8Bytes(parsedJson)) });
  } else if (value.isEditing && !value.encodings.json) {
    response.push({ id: 1, result: 0 });
  }

  // type 2: zlib compression
  if (value.encodings.zlib && parsedJson !== '') {
    response.push({ id: 2, result: ethers.utils.hexlify(deflateSync(Buffer.from(parsedJson))) });
  } else if (value.isEditing && !value.encodings.zlib) {
    response.push({ id: 2, result: 0 });
  }

  // type 4: cbor compression
  if (value.encodings.cbor && parsedJson !== '') {
    response.push({ id: 4, result: ethers.utils.hexlify(cbor.encode(parsedJson)) });
  } else if (value.isEditing && !value.encodings.cbor) {
    response.push({ id: 4, result: 0 });
  }

  // type 8: the URI straight
  if (value.encodings.uri) {
    response.push({ id: 8, result: ethers.utils.hexlify(value.uri) });
  } else if (value.isEditing && !value.encodings.uri) {
    response.push({ id: 8, result: 0 });
  }

  const definitiveResolver = new ethers.Contract(
    definitiveResolverAddress,
    definitiveResolverAbi,
    signer,
  );
  // prepare multicall methods array
  response.forEach((call) => {
    const iface = new ethers.utils.Interface(definitiveResolverAbi);

    multiCallMethods.push(
      iface.encodeFunctionData('setABI', [namehash(domain), call.id, call.result]),
    );
  });

  if (multiCallMethods.length === 0) {
    return dispatch(errorSetContent(CONTRACT_ABI, 'No encodings selected'));
  }

  // make the multicall
  try {
    const result = await definitiveResolver.multicall(multiCallMethods);
    result.wait();
    dispatch(receiveSetContent(
      CONTRACT_ABI,
      result,
      (value.inputMethod === 'delete'),
    ));
    return sendBrowserNotification(domain, 'contract_abi_set');
  } catch (error) {
    return dispatch(errorSetContent(CONTRACT_ABI, error.message));
  }
};

/**
 * Function to handle content type when setting. This will be expanded as more
 * content types are supported.
 * @param {const} contentType
 * @param {address} resolverAddress address of the resolver
 * @param {string} domain domain the content is associated with
 * @param {string} value value of the content
 */
export const setContent = (contentType, resolverAddress, domain, value) => (dispatch) => {
  switch (contentType) {
    case CONTENT_BYTES: return dispatch(setContentBytes(resolverAddress, domain, value));
    case CONTENT_HASH: return dispatch(setContentHash(domain, value));
    case CONTRACT_ABI: return dispatch(setContractAbi(resolverAddress, domain, value));
    default: return null;
  }
};

/**
 * Set the resolver to the Definitive Resolver and Migrate Users Addresses
 * @param {string} domain domain to be migrated
 * @param {array} chainAddresses array of all the chainAddresses from the reducer
 * @param {bool} understandWarning bool that the user knows some addresses are invalid
 */
export const setDomainResolverAndMigrate = (
  domain, chainAddresses, contentBytes, understandWarning,
) => async (dispatch) => {
  dispatch(requestMigrateAddresses());
  const hash = namehash(domain);
  const signer = await getSigner();
  const rnsSdk = rns(signer);
  const definitiveResolver = new ethers.Contract(
    definitiveResolverAddress,
    definitiveResolverAbi,
    signer,
  );


  // loop through addresses and skip empties, then get decoded version of the address,
  // if valid, create the contract method and add it to the multiCallMethods array.
  const multiCallMethods = [];
  let decodeError = false;
  Object.entries(chainAddresses).forEach((item) => {
    // if address is empty, do not continue
    if (item[1].address === '' || item[1].address === EMPTY_ADDRESS) {
      return false;
    }

    const decodedAddress = addressDecoder(item[1].address, getIndexById(item[1].chainId));

    // if returned a string, it is an error:
    if (typeof (decodedAddress) === 'string') {
      decodeError = true;
      return dispatch(errorDecodingAddress(
        item[1].chainId, getChainNameById(item[1].chainId), decodedAddress,
      ));
    }

    // valid address to be added to the multiCallMethods array:
    return multiCallMethods.push(
      definitiveResolver['setAddr(bytes32,uint256,bytes)'](
        hash, getIndexById(item[1].chainId), decodedAddress,
      ).encodeABI(),
    );
  });

  // add contentBytes if not null or empty
  if (contentBytes && contentBytes.value !== CONTENT_BYTES_BLANK && contentBytes.value !== '') {
    multiCallMethods.push(
      definitiveResolver['setContenthash(bytes32,bytes)'](
        hash, contentBytes.value,
      ).encodeABI(),
    );
  }

  // return if an error in decoding happened to let the user know
  if (decodeError && !understandWarning) {
    return dispatch(errorMigrateWithAddresses(''));
  }

  const migratePromise = [
    new Promise((resolve, reject) => {
      rnsSdk.setResolver(domain, definitiveResolverAddress)
        .then((result) => {
          result.wait();
          resolve(result.transactionHash);
        })
        .catch((error) => {
          reject(error);
        });
    }),

    new Promise((resolve, reject) => {
      definitiveResolver.multicall(multiCallMethods)
        .then((result) => {
          result.wait();
          resolve(result.transactionHash);
        })
        .catch((error) => {
          reject(error);
        });
    }),
  ];

  return Promise.all(migratePromise).then((values) => {
    dispatch(receiveSetResolver(
      values[0], definitiveResolverAddress, DEFINITIVE_RESOLVER,
    ));
    dispatch(receiveMigrateAddresses(values));
    dispatch(getAllChainAddresses(domain, DEFINITIVE_RESOLVER));
    dispatch(supportedInterfaces(definitiveResolverAddress, domain));
    sendBrowserNotification(domain, 'resolver_migration_complete');
  })
    .catch(() => {
      dispatch(errorMigrateWithAddresses('One of the transactions had an error.'));
    });
};
