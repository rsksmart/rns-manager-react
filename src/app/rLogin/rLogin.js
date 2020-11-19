/* eslint-disable radix */
import RLogin from '@rsksmart/rlogin';

const rLogin = new RLogin({
  cachedProvider: false,
  providerOptions: {},
  supportedChains: [parseInt(process.env.REACT_APP_ENVIRONMENT_ID)],
});

export default rLogin;
