import { utils } from 'web3';

function numberToUint32(number) {
  const hexDuration = utils.numberToHex(number);
  let duration = '';
  for (let i = 0; i < 66 - hexDuration.length; i += 1) {
    duration += '0';
  }
  duration += hexDuration.slice(2);
  return duration;
}

function utf8ToHexString(string) {
  return string ? utils.asciiToHex(string).slice(2) : '';
}

/**
 * registration with rif transferAndCall encoding
 * @param {string} name to register
 * @param {address} owner of the new name
 * @param {hex} secret of the commit
 * @param {BN} duration to register in years
 */
// eslint-disable-next-line import/prefer-default-export
export const getRegisterData = (name, owner, secret, duration) => {
  // 0x + 8 bytes
  const dataSignature = '0xc2c414c8';

  // 20 bytes
  const dataOwner = owner.toLowerCase().slice(2);

  // 32 bytes
  let dataSecret = secret.slice(2);
  const padding = 64 - dataSecret.length;
  for (let i = 0; i < padding; i += 1) {
    dataSecret += '0';
  }

  // 32 bytes
  const dataDuration = numberToUint32(duration);

  // variable length
  const dataName = utf8ToHexString(name);

  return `${dataSignature}${dataOwner}${dataSecret}${dataDuration}${dataName}`;
};
