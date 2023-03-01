/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IPartnerManager,
  IPartnerManagerInterface,
} from "../../../contracts/PartnerManager/IPartnerManager";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "partner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "configurationContract",
        type: "address",
      },
    ],
    name: "PartnerAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "partner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "configurationContract",
        type: "address",
      },
    ],
    name: "PartnerConfigurationChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "partner",
        type: "address",
      },
    ],
    name: "PartnerRemoved",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "partner",
        type: "address",
      },
      {
        internalType: "contract IPartnerConfiguration",
        name: "partnerConfiguration",
        type: "address",
      },
    ],
    name: "addPartner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "partner",
        type: "address",
      },
    ],
    name: "getPartnerConfiguration",
    outputs: [
      {
        internalType: "contract IPartnerConfiguration",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "partner",
        type: "address",
      },
    ],
    name: "isPartner",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "partner",
        type: "address",
      },
    ],
    name: "removePartner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "partner",
        type: "address",
      },
      {
        internalType: "contract IPartnerConfiguration",
        name: "configuration",
        type: "address",
      },
    ],
    name: "setPartnerConfiguration",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export class IPartnerManager__factory {
  static readonly abi = _abi;
  static createInterface(): IPartnerManagerInterface {
    return new utils.Interface(_abi) as IPartnerManagerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IPartnerManager {
    return new Contract(address, _abi, signerOrProvider) as IPartnerManager;
  }
}
