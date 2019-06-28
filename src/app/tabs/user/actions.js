import { CHANGE_MYCRYPTO_METAMASK } from './types';

// eslint-disable-next-line import/prefer-default-export
export const changeMyCryptoMetamask = viewMyCrypto => ({
  type: CHANGE_MYCRYPTO_METAMASK,
  viewMyCrypto,
});
