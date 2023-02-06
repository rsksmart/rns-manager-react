import Utils from 'web3-utils';

function numberToUint32(number) {
  const hexDuration = Utils.numberToHex(number);
  let duration = '';
  for (let i = 0; i < 66 - hexDuration.length; i += 1) {
    duration += '0';
  }
  duration += hexDuration.slice(2);
  return duration;
}

function utf8ToHexString(string) {
  return string ? Utils.asciiToHex(string).slice(2) : '';
}

// eslint-disable-next-line import/prefer-default-export
export const getRenewData = (name, duration, partner) => {
  // 0x + 8 bytes
  const dataSignature = '0x8d7016ca';

  // 32 bytes
  const dataDuration = numberToUint32(duration);

  // 20 bytes
  const dataPartner = partner.toLowerCase().slice(2);

  // variable length
  const dataName = utf8ToHexString(name);

  return `${dataSignature}${dataDuration}${dataPartner}${dataName}`;
};
