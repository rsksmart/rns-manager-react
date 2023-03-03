import { isValidAddress, isValidChecksumAddress } from 'rskjs-util';
import { normalize } from '@ensdomains/eth-ens-namehash';


/**
 * validates rns names. e.g. wallet.alice.rsk is a valid name
 * @param {string} name to validate
 * @returns {bool} if the name is valid
 */
export const isValidName = (name) => {
  const labels = name.split('.');

  if (labels.length > 1) {
    return 'Search only simple names';
  }

  // The regex pattern matches English lowercase letters, numbers 0 to 9,
  // special characters, and Unicode characters except for a full stop.
  if (labels[0].match('^[a-z0-9!@#$%^&*()-_+={}[\]\\|;:\'",<>?/`~\\p{L}\\p{N}]*$')) { /* eslint-disable-line */
    return 'Invalid name. Name can contain only lowercase letters, digits, and unicode characters except for full stops and spaces.';
  }

  try {
    normalize(labels[0]);
  } catch (err) {
    return 'Domain contains illegal character(s).';
  }

  return null;
};

export const isValidDomain = (name) => {
  const labels = name.split('.');

  let isValid = true;

  labels.forEach((label) => {
    if (label.length === 0) isValid = false;
    if (label.match('[^a-z0-9]')) isValid = false;
  });

  return isValid;
};

/**
 * validate addresses according to rskip-60
 * https://github.com/rsksmart/RSKIPs/blob/master/IPs/RSKIP60.md
 * @param {string} address to validate
 * @param {number} chainId defined in erip-155
 * @returns {string} null if it's valid and an error message if it is not
 */
export const validateAddress = (address, chainId) => {
  if (!isValidAddress(address)) return 'Invalid address';
  if (!isValidChecksumAddress(address, chainId) && address !== address.toLowerCase()) return 'Invalid checksum';
  return null;
};

/**
 * validate if a number is positive
 * @param {number} number to validate
 * @returns {string} null if it's valid and an error message if it is not
 */
export const validatePositiveNumber = number => (number >= 0 ? null : 'Invalid number');

/**
 * validate a bytes32
 * @param {string} bytes to validate
 * @returns {string} null if it's valid and an error message if it is not
 */
export const validateBytes32 = bytes => (bytes.length === 66 && bytes.slice(0, 2) === '0x' ? null : 'Invalid bytes');
