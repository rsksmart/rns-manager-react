import { createRLogin } from '@rsksmart/rlogin-essentials';

const trezorOptions = {
  manifestEmail: 'info@iovlabs.org',
  manifestAppUrl: import.meta.env.VITE_URL,
};

const isMainnet = import.meta.env.VITE_ENVIRONMENT_ID === '30';

const rpcUrls = isMainnet ? {
  30: 'https://public-node.rsk.co',
} : {
  31: 'https://public-node.testnet.rsk.co',
};

const rLogin = createRLogin(rpcUrls, trezorOptions);

export default rLogin;
