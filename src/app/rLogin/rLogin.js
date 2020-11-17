/* eslint-disable radix */
import RLogin from '@rsksmart/rlogin';

const rLogin = new RLogin({
  cachedProvider: false,
  providerOptions: {},
});

export default rLogin;
