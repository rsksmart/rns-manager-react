import { createAppKit } from '@reown/appkit';
import { EthersAdapter } from '@reown/appkit-adapter-ethers';
import { ethers } from 'ethers';

const projectId = process.env.REACT_APP_PROJECT_ID
  || process.env.REACT_APP_WALLETCONNECT_PROJECT_ID
  || '';

const appUrl = typeof window !== 'undefined' ? window.location.origin : '';

const metadata = {
  name: 'RNS Manager',
  description: 'RNS Manager Login',
  url: appUrl,
  icons: ['https://rootstock.io/favicon.ico'],
};

const rootstockMainnet = {
  id: 30,
  chainId: 30,
  chainNamespace: 'eip155',
  name: 'Rootstock Mainnet',
  rpcUrls: {
    default: { http: ['https://public-node.rsk.co'] },
    public: { http: ['https://public-node.rsk.co'] },
  },
  blockExplorers: {
    default: { name: 'RSK Explorer', url: 'https://explorer.rsk.co' },
  },
  nativeCurrency: { name: 'Rootstock Smart Bitcoin', symbol: 'RBTC', decimals: 18 },
};

const rootstockTestnet = {
  id: 31,
  chainId: 31,
  chainNamespace: 'eip155',
  name: 'Rootstock Testnet',
  rpcUrls: {
    default: { http: ['https://public-node.testnet.rsk.co'] },
    public: { http: ['https://public-node.testnet.rsk.co'] },
  },
  blockExplorers: {
    default: { name: 'RSK Explorer', url: 'https://explorer.testnet.rsk.co' },
  },
  nativeCurrency: { name: 'Test RBTC', symbol: 'tRBTC', decimals: 18 },
};

const networks = [rootstockMainnet, rootstockTestnet];

const defaultNetworkId = parseInt(process.env.REACT_APP_ENVIRONMENT_ID || '', 10)
  || rootstockTestnet.id;

const ethersAdapter = new EthersAdapter({
  ethers,
  metadata,
  projectId,
  defaultNetworkId,
  networks,
});

export const appKit = createAppKit({
  adapters: [ethersAdapter],
  metadata,
  networks,
  projectId,
});

export default appKit;
