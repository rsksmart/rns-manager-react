import { keccak256, toUtf8Bytes } from 'ethers/lib/utils';
import { BigNumber } from 'ethers';

const nameToToken = (name) => {
  const nameAsHash = keccak256(toUtf8Bytes(name));
  return BigNumber.from(nameAsHash);
};

export default nameToToken;
