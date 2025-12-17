import RLogin from '@rsksmart/rlogin';
import WalletConnectProvider from '@walletconnect/web3-provider';
// import { trezorProviderOptions } from '@rsksmart/rlogin-trezor-provider';
// import { ledgerProviderOptions } from '@rsksmart/rlogin-ledger-provider';

const createRLogin = () => {
  const rpcUrls = process.env.REACT_APP_ENVIRONMENT_ID === '30' ? {
    30: 'https://public-node.rsk.co',
  } : {
    31: 'https://public-node.testnet.rsk.co',
  };

  /*
  const providerOptions = Object.assign({
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        rpcUrls,
        bridge: 'https://walletconnect-bridge.rifos.org/',
      },
    },
    'custom-ledger': ledgerProviderOptions,
    'custom-trezor': {
      ...trezorProviderOptions,
      options: {
        manifestEmail: 'info@iovlabs.org',
        manifestAppUrl: process.env.REACT_APP_URL,
      },
    },
  });
   */

  const supportedChains = Object.keys(rpcUrls).map(Number);

  return new RLogin({
    cacheProvider: false,
    providerOptions: undefined,
    rpcUrls,
    supportedChains,
  });
};

export default createRLogin();
