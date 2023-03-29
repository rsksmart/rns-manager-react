import { ethers } from 'ethers';
import getSigner from './getSigner';

export const setContentHash = async (domain, content, resolverAddress, definitiveResolverAbi) => {
  dispatch(actions.requestSetContentHash());
  const signer = await getSigner();
  const resolver = new ethers.Contract(resolverAddress, definitiveResolverAbi, signer);
  const hash = namehash(domain);
  try {
    const tx = await resolver.setContenthash(hash, content);
    return tx.wait();
  } catch (error) {
    return error;
  }
}

export const contentHash = async (resolverAddress, domain, definitiveResolverAbi) => {
    dispatch(actions.requestContentHash());
    const signer = await getSigner();
    const resolver = new ethers.Contract(resolverAddress, definitiveResolverAbi, signer);
    const hash = namehash(domain);
    try {
        const contentHash = await resolver.contenthash(hash);
        return contentHash;
    } catch (error) {
        return error;
    }
}