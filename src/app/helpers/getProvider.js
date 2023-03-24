import { ethers } from 'ethers';

function getProvider() {
  // A Web3Provider wraps a standard Web3 provider, which is
  // what MetaMask injects as window.ethereum into each page
  return new ethers.providers.Web3Provider(window.rLogin);
}

export default getProvider;
