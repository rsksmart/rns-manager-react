import { PartnerRegistrar } from '@rsksmart/rns-sdk';
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

export const partnerConfiguration = () => 'awesome';
