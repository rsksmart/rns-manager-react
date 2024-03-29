import {
  PartnerRegistrar,
  PartnerConfiguration,
  RNS,
  AddrResolver,
} from '@rsksmart/rns-sdk';
import { ethers } from 'ethers';
import { rskNode } from './adapters/nodeAdapter';
import {
  rskOwner as rskOwnerAddress,
  fifsAddrRegistrar as fifsAddrRegistrarAddress,
  renewer,
  rif,
  getCurrentPartnerAddresses,
  rns as registryAddress,
} from './adapters/configAdapter';

export const provider = new ethers.providers.JsonRpcProvider(rskNode);
export const defaultSigner = new ethers.VoidSigner('', provider);

export const getCurrentPartner = () => {
  const searchParams = new URLSearchParams(document.location.search);
  return searchParams.get('partner') || 'default';
};

export const registrar = async (signer = defaultSigner) => {
  const partnerAddresses = await getCurrentPartnerAddresses(
    getCurrentPartner(),
  );
  return new PartnerRegistrar(
    partnerAddresses.account,
    fifsAddrRegistrarAddress,
    renewer,
    rskOwnerAddress,
    rif,
    signer,
  );
};

export const partnerConfiguration = async (signer = defaultSigner) => {
  const partnerAddresses = await getCurrentPartnerAddresses(
    getCurrentPartner(),
  );

  return new PartnerConfiguration(partnerAddresses.config, signer);
};

export const rns = (signer = defaultSigner) => new RNS(registryAddress, signer);

// the library gets the resolver for a name from the registry
export const resolver = (signer = defaultSigner) => new AddrResolver(registryAddress, signer);
