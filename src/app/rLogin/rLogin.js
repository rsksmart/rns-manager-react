/* eslint-disable radix */
import RLogin from '@rsksmart/rlogin';
import WalletConnectProvider from '@walletconnect/web3-provider';
import Portis from '@portis/web3';
import { ledgerProviderOptions } from '@rsksmart/rlogin-ledger-provider';

const rpcUrls = process.env.REACT_APP_ENVIRONMENT_ID === '30' ? {
  30: 'https://public-node.rsk.co',
} : {
  31: 'https://public-node.testnet.rsk.co',
}

const rLogin = new RLogin({
  cachedProvider: false,
  providerOptions: {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        rpc: rpcUrls
      },
    },
    portis: {
      package: Portis,
      options: {
        id: '7ea0e47e-ff3c-4fc7-85cb-7b336d0569ed',
        network: process.env.REACT_APP_ENVIRONMENT_ID === '30' ? {
          nodeUrl: 'https://public-node.rsk.co',
          chainId: 30,
        } : {
          nodeUrl: 'https://public-node.testnet.rsk.co',
          chainId: 31,
        },
      },
    },
    'custom-ledger': {
      ...ledgerProviderOptions,
    },
    'custom-dcent': {
      ...dcentProviderOptions,
    },
    'custom-trezor': {
      ...trezorProviderOptions,
      options: {
        manifestEmail: 'info@iovlabs.org',
        manifestAppUrl: process.env.REACT_APP_URL,
      }
    }
  },
  rpcUrls,
  supportedChains: Object.keys(rpcUrls).map(Number),
});

export default rLogin;
