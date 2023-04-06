import { ethers } from 'ethers';
import { namehash } from 'ethers/lib/utils';
import getSigner from './getSigner';
import getProvider from './getProvider';

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
  const resolver = new ethers.Contract(resolverAddress, definitiveResolverAbi, getProvider());
  const hash = namehash(domain);
  try {
    const result = await resolver.contenthash(hash);
    return result;
  } catch (error) {
    return error;
  }
};
