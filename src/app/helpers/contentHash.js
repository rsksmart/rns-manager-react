import { ethers } from 'ethers';
import { namehash } from 'ethers/lib/utils';
import _contentHash from 'content-hash';
import bs58 from 'bs58';
import getSigner from './getSigner';
import getProvider from './getProvider';

const decodeContenthash = (encoded) => {
  let decoded = '';
  let protocolType = '';

  try {
    decoded = _contentHash.decode(encoded);
    const codec = _contentHash.getCodec(encoded);
    if (codec === 'ipfs-ns') {
      protocolType = 'ipfs';
    } else if (codec === 'ipns-ns') {
      decoded = bs58.decode(decoded).slice(2).toString();
      protocolType = 'ipns';
    } else if (codec === 'swarm-ns') {
      protocolType = 'bzz';
    } else if (codec === 'onion') {
      protocolType = 'onion';
    } else if (codec === 'onion3') {
      protocolType = 'onion3';
    } else {
      throw new Error('UNSUPPORTED_CONTENTHASH_PROTOCOL');
    }
  } catch (e) {
    throw new Error('UNSUPPORTED_CONTENTHASH_PROTOCOL');
  }

  return { decoded, protocolType };
};

export const setContentHash = async (domain, content, resolverAddress, definitiveResolverAbi) => {
  const signer = await getSigner();
  const resolver = new ethers.Contract(resolverAddress, definitiveResolverAbi, signer);
  const hash = namehash(domain);
  try {
    const encodedContentHash = await encodeContenthash(content)
    const tx = await resolver.setContenthash(hash, encodedContentHash);
    return tx.wait();
  } catch (error) {
    throw error;
  }
};

export const contentHash = async (resolverAddress, domain, definitiveResolverAbi) => {
  const CONTENTHASH_INTERFACE = '0xbc1c58d1';
  const resolver = new ethers.Contract(resolverAddress, definitiveResolverAbi, getProvider());
  const domainHash = namehash(domain);
  try {
    const supportsInterface = await resolver.supportsInterface(CONTENTHASH_INTERFACE);

    if (!supportsInterface) {
      throw new Error('NO_CONTENTHASH_INTERFACE');
    }
    const resultEncoded = await resolver.contenthash(domainHash);

    if (!resultEncoded || resultEncoded === '0x') {
      throw new Error('NO_CONTENTHASH_SET');
    }

    const resultDecoded = decodeContenthash(resultEncoded);

    if (resultDecoded && !resultDecoded.protocolType) {
      throw new Error('UNSUPPORTED_CONTENTHASH_PROTOCOL');
    }

    return resultDecoded;
  } catch (error) {
    throw error;
  }
};

export const encodeContenthash = async (text) => {
    let content = '';
    let contentType = '';
    if (text) {
      const matched = text.match(/^(ipfs|ipns|bzz|onion|onion3):\/\/(.*)/)
        || text.match(/\/(ipfs)\/(.*)/);
      if (matched) {
        ([, contentType, content] = matched);
      }

      try {
        if (contentType === 'ipfs') {
          if (content.length >= 4) {
            return `0x${_contentHash.encode('ipfs-ns', content)}`;
          }
        } else if (contentType === 'ipns') {
          const bs58content = bs58.encode(
            Buffer.concat([
              Buffer.from([0, content.length]),
              Buffer.from(content),
            ]),
          );
          return `0x${_contentHash.encode('ipns-ns', bs58content)}`;
        } else if (contentType === 'bzz') {
          if (content.length >= 4) {
            return `0x${_contentHash.fromSwarm(content)}`;
          }
        } else if (contentType === 'onion') {
          if (content.length === 16) {
            return `0x${_contentHash.encode('onion', content)}`;
          }
        } else if (contentType === 'onion3') {
          if (content.length === 56) {
            return `0x${_contentHash.encode('onion3', content)}`;
          }
        } else {
          throw new Error('UNSUPPORTED_CONTENTHASH_PROTOCOL');
        }
      } catch (err) {
        throw err;
      }
    }

    return '';
  }