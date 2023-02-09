import RLogin from '@rsksmart/rlogin';
import WalletConnectProvider from '@walletconnect/web3-provider';

export const ENetwork = {
  NotSupported: -1,
  RSKMainnet: 30,
  RSKTestnet: 31,
  Hardhat: 31337,
  Ganache: 1337,
};

export const SupportedNetworks = [
  ENetwork.RSKMainnet,
  ENetwork.RSKTestnet,
  ENetwork.Ganache,
  ENetwork.Hardhat];

export const rLogin = new RLogin({
  cacheProvider: true, // change to true to cache user's wallet choice
  providerOptions: {
    // read more about providers setup in https://github.com/web3Modal/web3modal/
    walletconnect: {
      package: WalletConnectProvider, // setup wallet connect for mobile wallet support
      options: {
        rpc: {
          [ENetwork.RSKTestnet]: 'https://public-node.testnet.rsk.co', // use RSK public nodes to connect to the testnet
          [ENetwork.RSKMainnet]: 'https://public-node.rsk.co', // use RSK public nodes to connect to the mainnet
          [ENetwork.Ganache]: 'http://127.0.0.1:8545/',
          [ENetwork.Hardhat]: 'http://127.0.0.1:8545/',
        },
      },
    },
  },
  supportedChains: SupportedNetworks,
});

export const isRLoginConnected = () => {
  const result = !!localStorage.getItem('WEB3_CONNECT_CACHED_PROVIDER');

  return result;
};

export default rLogin;
