import { createRLogin } from '@rsksmart/rlogin-essentials';

const trezorOptions = {
  manifestEmail: 'info@iovlabs.org',
  manifestAppUrl: process.env.REACT_APP_URL,
};

export const rpcUrlSelector = (network) => {
  switch (network) {
    case '30': return 'https://public-node.rsk.co';
    case '31': return 'https://public-node.testnet.rsk.co';
    case process.env.REACT_APP_ENVIRONMENT_ID: return 'http://localhost:8545';
    default: return 'invalid';
  }
};

const rpcUrls = rpcUrlSelector(process.env.REACT_APP_ENVIRONMENT_ID);

const rLogin = createRLogin(rpcUrls, trezorOptions);

export default rLogin;
