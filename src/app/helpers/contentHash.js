import {ethers} from 'ethers';
import {namehash} from 'ethers/lib/utils';
import getSigner from './getSigner';
import getProvider from './getProvider';
import contentHash from 'content-hash';

const decodeContenthash = (encoded) => {
  let decoded = '';
  let protocolType = '';

  try {
    decoded = contentHash.decode(encoded);
    const codec = contentHash.getCodec(encoded);
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
      throw new Error("UNSUPPORTED_CONTENTHASH_PROTOCOL");
    }
  } catch (e) {
    throw new Error("UNSUPPORTED_CONTENTHASH_PROTOCOL");
  }

  return { decoded, protocolType };
}

export const setContentHash = async (domain, content, resolverAddress, definitiveResolverAbi) => {
  const signer = await getSigner();
  const resolver = new ethers.Contract(resolverAddress, definitiveResolverAbi, signer);
  const hash = namehash(domain);
  try {
    const tx = await resolver.setContenthash(hash, content);
    return tx.wait();
  } catch (error) {
    return error;
  }
};

export const contentHash = async (resolverAddress, domain, definitiveResolverAbi) => {
  const CONTENTHASH_INTERFACE = '0xbc1c58d1';
  const signer = await getSigner();
  const resolver = new ethers.Contract(resolverAddress, definitiveResolverAbi, signer);
  const hash = namehash(domain);
  try {
    const supportsInterface = await resolver.supportsInterface(CONTENTHASH_INTERFACE);

    if (!supportsInterface) {
      throw new Error("NO_CONTENTHASH_INTERFACE");
    }
    const resultEncoded = await resolver.contenthash(hash);

    if(!resultEncoded || resultEncoded === '0x') {
      throw new Error("NO_CONTENTHASH_SET");
    }

    const resultDecoded = decodeContenthash(resultEncoded);

    if(!resultDecoded?.protocolType) {
      throw new Error("UNSUPPORTED_CONTENTHASH_PROTOCOL");
    }

    return resultDecoded;
  } catch (error) {
    return error;
  }
};
