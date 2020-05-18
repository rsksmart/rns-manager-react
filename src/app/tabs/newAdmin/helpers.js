import { formatsByCoinType } from '@ensdomains/address-encoder';
import { EMPTY_ADDRESS } from './types';

export const dayMath = (days, today = new Date()) => {
  const result = new Date(today);
  return result.setDate(result.getDate() + days);
};

export const formatDate = (date) => {
  const result = new Date(date);
  const monthArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${result.getDate()} / ${monthArray[result.getMonth()]} / ${result.getFullYear()}`;
};

export const truncateString = string => `${string.substr(0, 6)}...${string.substr((string.length - 6))}`;

/**
 * Decodes address to be placed into the blockchain
 * @param {address} address to be decoded
 * @param {int} chainIndex ChainIndex as specificed by silp-0044
 */
export const addressDecoder = (address, chainIndex) => {
  // decoder expects RSK to be the mainnet checksum version
  const addr = chainIndex === 137 ? address.toLowerCase() : address;

  let encodeValue = address;

  if (encodeValue !== EMPTY_ADDRESS) {
    try {
      encodeValue = formatsByCoinType[chainIndex].decoder(addr);
    } catch (error) {
      throw new Error('Error converting:', address);
    }
  }

  return encodeValue;
};
