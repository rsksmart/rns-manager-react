import { isValidAddress, isValidChecksumAddress } from 'rskjs-util';

export const isValidName = name => {
  const labels = name.split('.');

  let isValid = true;

  labels.forEach(label => {
    if (label.length === 0) isValid = false; 
  });

  return isValid;
};

export const validateAddress = (address, network) => {
  if (!isValidAddress(address)) return 'Invalid address';
  if (!isValidChecksumAddress(address, network) && address !== address.toLowerCase()) return 'Invalid checksum';
  return null;
}
