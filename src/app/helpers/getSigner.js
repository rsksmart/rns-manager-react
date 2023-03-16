import { ethers } from 'ethers';

async function getSigner(addressOrIndex) {
  // A Web3Provider wraps a standard Web3 provider, which is
  // what MetaMask injects as window.ethereum into each page
  const provider = new ethers.providers.Web3Provider(window.rLogin);

  // MetaMask requires requesting permission to connect users accounts
  await provider.send('eth_requestAccounts', []);

  // The MetaMask plugin also allows signing transactions to
  // send ether and pay to change state within the blockchain.
  // For this, you need the account signer...
  return addressOrIndex ? provider.getSigner(addressOrIndex) : provider.getSigner();
}

export default getSigner;
