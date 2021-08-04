/* eslint-disable radix */
import RLogin from '@rsksmart/rlogin';
import WalletConnectProvider from '@walletconnect/web3-provider';

const rLogin = new RLogin({
  cachedProvider: false,
  providerOptions: {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        rpc: {
          30: 'https://public-node.rsk.co',
          31: 'https://public-node.testnet.rsk.co',
        },
      },
    },
  },
  supportedChains: [parseInt(process.env.REACT_APP_ENVIRONMENT_ID)],
});

export default rLogin;
