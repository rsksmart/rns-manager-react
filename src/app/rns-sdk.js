import {
  PartnerRegistrar, PartnerConfiguration, RNS, AddrResolver,
} from '@rsksmart/rns-sdk';
import { ethers } from 'ethers';
import { rskNode } from './adapters/nodeAdapter';
import {
  rskOwner as rskOwnerAddress,
  fifsAddrRegistrar as fifsAddrRegistrarAddress,
  renewer,
  rif,
  getCurrentPartnerAddresses,
} from './adapters/configAdapter';

const defaultSigner = new ethers.providers.JsonRpcProvider(rskNode).getSigner();

export const getCurrentPartner = () => {
  const searchParams = new URLSearchParams(document.location.search);
  return searchParams.get('partner') || 'default';
};

export const registrar = async (
  signer = defaultSigner,
) => {
  const partnerAddresses = await getCurrentPartnerAddresses(getCurrentPartner());
  return new PartnerRegistrar(
    partnerAddresses.account,
    fifsAddrRegistrarAddress,
    renewer, rskOwnerAddress,
    rif,
    signer,
  );
};

export const partnerConfiguration = async (
  signer = defaultSigner,
) => {
  const partnerAddresses = await getCurrentPartnerAddresses(getCurrentPartner());
  return new PartnerConfiguration(
    partnerAddresses.config,
    signer,
  );
};

export const rns = (
  signer = defaultSigner,
) => new RNS(fifsAddrRegistrarAddress, signer);

export const resolver = (
  signer = defaultSigner,
) => new AddrResolver(fifsAddrRegistrarAddress, signer);
