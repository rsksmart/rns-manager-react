import { hash as namehash } from "@ensdomains/eth-ens-namehash";
import { isValidAddress } from "rskjs-util";
import { formatsByCoinType } from "@ensdomains/address-encoder";
import { ethers } from "ethers";
import * as actions from "./actions";
import { rnsAbi, abstractResolverAbi } from "./abis.json";
import { definitiveResolverAbi } from "../newAdmin/resolver/definitiveAbis.json";
import { rns as rnsAddress } from "../../adapters/configAdapter";
import resolverInterfaces from "./resolverInterfaces.json";
import { ERROR_RESOLVE_NAME } from "./types";
import { ERROR_SAME_VALUE, EMPTY_ADDRESS } from "../newAdmin/types";
import { rns, defaultSigner } from "../../rns-sdk";
import { contentHash as CH } from "../../helpers/contentHash";

/**
 * Resolves a domain name using the js library
 * @param {string} domain to resolve
 * @param {bytes4} chainId to search, set as null if RKS to search both multichain and public
 * @param {function} errorFunction the function to dispatch if there is an error
 * @param {string} value the value to check the resolution against to see if they match
 */
export const resolveDomain =
  (domain, errorFunction = null, value = null) =>
  async (dispatch) => {
    const rnsSdk = rns();

    dispatch(actions.requestAddr());

    try {
      const response = await rnsSdk.getResolver(domain);

      if (value && response.toLowerCase() === value.toLowerCase()) {
        dispatch(errorFunction(ERROR_SAME_VALUE));
        return false;
      }

      dispatch(actions.receiveAddr(response));
      return response.toLowerCase();
    } catch (error) {
      dispatch(actions.errorResolve(error));
      dispatch(errorFunction(ERROR_RESOLVE_NAME));
      return false;
    }
  };

export const identifyInterfaces = (domain) => async (dispatch) => {
  if (!domain) {
    return dispatch(actions.receiveResolve(""));
  }

  dispatch(actions.requestResolve());

  const hash = namehash(domain);

  const rnsContract = new ethers.Contract(rnsAddress, rnsAbi, defaultSigner);

  try {
    const resolverAddress = await rnsContract.resolver(hash);
    if (resolverAddress === "0x0000000000000000000000000000000000000000") {
      return dispatch(actions.errorResolve("this name is not registered"));
    }
    const abstractResolver = new ethers.Contract(
      resolverAddress,
      abstractResolverAbi,
      defaultSigner
    );
    dispatch(actions.receiveResolverAddress(resolverAddress));

    const resolutions = [];

    /* eslint-disable no-await-in-loop */
    for (let i = 0; i < resolverInterfaces.length; i += 1) {
      const resolverInterface = resolverInterfaces[i];
      const supportsInterface = await abstractResolver.supportsInterface(
        resolverInterface.signature
      );
      if (supportsInterface) {
        resolutions.push(resolverInterface);
        dispatch(actions.receiveSupportedInterface(resolverInterface.name));
      }
    }

    dispatch(addr(resolverAddress, domain));

    if (resolutions.length) {
      dispatch(actions.receiveResolve(resolutions));
      return resolutions;
    }

    return dispatch(actions.errorResolve("no resolution found"));
  } catch (error) {
    return dispatch(actions.errorResolve(error.message));
  }
};

export const addr = (resolverAddress, name) => async (dispatch) => {
  dispatch(actions.requestAddr());

  const addrResolver = new ethers.Contract(
    resolverAddress,
    resolverInterfaces[0].abi,
    defaultSigner
  );

  const hash = namehash(name);

  try {
    const addrResolution = await addrResolver.addr(hash);

    return dispatch(actions.receiveAddr(addrResolution));
  } catch (error) {
    return dispatch(actions.errorAddr(error.message));
  }
};

export const chainAddr =
  (resolverAddress, name, chainId) => async (dispatch) => {
    dispatch(actions.requestChainAddr());

    const addrResolver = new ethers.Contract(
      resolverAddress,
      resolverInterfaces[1].abi,
      defaultSigner
    );

    const hash = namehash(name);

    try {
      const chainAddrResolution = await addrResolver.chainAddr(hash, chainId);

      return dispatch(actions.receiveChainAddr(chainAddrResolution));
    } catch (error) {
      return dispatch(actions.errorChainAddr(error.message));
    }
  };

export const multicoin =
  (resolverAddress, domain, chainId) => async (dispatch) => {
    dispatch(actions.requestChainAddr());

    const hash = namehash(domain);

    const resolver = new ethers.Contract(
      resolverAddress,
      definitiveResolverAbi,
      defaultSigner
    );

    try {
      const resolution = await resolver.addr(hash, chainId);

      if (!resolution || resolution === EMPTY_ADDRESS) {
        return dispatch(actions.receiveChainAddr(""));
      }

      // eslint-disable-next-line new-cap
      const dataBuffer = new Buffer.from(resolution.replace("0x", ""), "hex");
      const result = formatsByCoinType[chainId].encoder(dataBuffer);

      if (chainId === "0x80000089") {
        dispatch(actions.receiveAddr(result));
      }

      return dispatch(actions.receiveChainAddr(result));
    } catch (error) {
      return dispatch(actions.errorChainAddr(error.message));
    }
  };

export const name = (resolverAddress, address) => async (dispatch) => {
  dispatch(actions.requestName());

  const nameResolver = new ethers.Contract(
    resolverAddress,
    resolverInterfaces[2].abi,
    defaultSigner
  );

  const value = isValidAddress(address)
    ? `${address.replace("0x", "")}.addr.reverse`
    : address;
  const hash = namehash(value);

  try {
    const nameResolution = await nameResolver.name(hash);

    return dispatch(actions.receiveName(nameResolution));
  } catch (error) {
    return dispatch(actions.errorName(error.message));
  }
};

export const contentHash = (domain) => async (dispatch) => {
  dispatch(actions.requestContent("CONTENT_HASH"));

  try {
    const rnsContract = new ethers.Contract(rnsAddress, rnsAbi, defaultSigner);
    const hash = namehash(domain);
    const resolverAddress = await rnsContract.resolver(hash);
    const result = await CH(resolverAddress, domain, definitiveResolverAbi);
    return dispatch(actions.receiveContent("CONTENT_HASH", result));
  } catch (error) {
    return dispatch(actions.errorContent("CONTENT_HASH", error.message));
  }
};

export const searchAddressOrDomain = (input) => (dispatch) => {
  const value = isValidAddress(input)
    ? `${input.replace("0x", "")}.addr.reverse`
    : input;
  return dispatch(identifyInterfaces(value));
};

export const getAddress =
  (resolverAddress, supportedInterfaces, domain, chainId) => (dispatch) => {
    supportedInterfaces.forEach((interfaceId) => {
      switch (interfaceId) {
        case "multicoin":
          return dispatch(
            multicoin(resolverAddress, domain, chainId || "0x80000089")
          );
        case "chainAddr":
          return dispatch(
            chainAddr(resolverAddress, domain, chainId || "0x80000089")
          );
        case "addr":
          return dispatch(addr(resolverAddress, domain));
        case "contenthash":
          return dispatch(contentHash(domain));
        default:
          return false;
      }
    });
  };
