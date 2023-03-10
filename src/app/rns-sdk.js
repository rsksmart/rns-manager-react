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
} from './adapters/configAdapter';

const defaultSigner = new ethers.providers.JsonRpcProvider(rskNode).getSigner();

export const registrar = (
  partnerAddress,
  signer = defaultSigner,
) => new PartnerRegistrar(
  partnerAddress,
  fifsAddrRegistrarAddress,
  renewer, rskOwnerAddress,
  rif,
  signer,
);

export const partnerConfiguration = (
  partnerAddress,
  signer = defaultSigner,
) => new PartnerConfiguration(
  partnerAddress,
  signer,
);

export const rns = (
  signer = defaultSigner,
) => new RNS(fifsAddrRegistrarAddress, signer);

export const resolver = (
  signer = defaultSigner,
) => new AddrResolver(fifsAddrRegistrarAddress, signer);
