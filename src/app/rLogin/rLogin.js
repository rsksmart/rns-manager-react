/* eslint-disable radix */
import RLogin from '@rsksmart/rlogin';
import WalletConnectProvider from '@walletconnect/web3-provider';
import Portis from '@portis/web3';

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
    portis: {
      package: Portis,
      options: {
        id: '7ea0e47e-ff3c-4fc7-85cb-7b336d0569ed',
        network: {
          nodeUrl: 'https://public-node.testnet.rsk.co',
          chainId: 31,
        },
      },
    },
  },
  supportedChains: [parseInt(process.env.REACT_APP_ENVIRONMENT_ID)],
});

export default rLogin;
