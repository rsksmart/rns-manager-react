import { createRLogin } from '@rsksmart/rlogin-essentials';

const trezorOptions = {
  manifestEmail: 'info@iovlabs.org',
  manifestAppUrl: process.env.REACT_APP_URL,
};

const isMainnet = process.env.REACT_APP_ENVIRONMENT_ID === '30';

const rpcUrls = isMainnet ? {
  30: 'https://public-node.rsk.co',
} : {
  31: 'https://public-node.testnet.rsk.co',
};

const rLogin = createRLogin(rpcUrls, trezorOptions);

export default rLogin;
