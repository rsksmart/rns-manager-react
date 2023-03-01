/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../common";

export interface IBaseRegistrarInterface extends utils.Interface {
  functions: {
    "canReveal(bytes32)": FunctionFragment;
    "commit(bytes32,address)": FunctionFragment;
    "getPartnerManager()": FunctionFragment;
    "makeCommitment(bytes32,address,bytes32,uint256,address)": FunctionFragment;
    "price(string,uint256,uint256,address)": FunctionFragment;
    "register(string,address,bytes32,uint256,address,address)": FunctionFragment;
    "setFeeManager(address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "canReveal"
      | "commit"
      | "getPartnerManager"
      | "makeCommitment"
      | "price"
      | "register"
      | "setFeeManager"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "canReveal",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "commit",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getPartnerManager",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "makeCommitment",
    values: [
      PromiseOrValue<BytesLike>,
      PromiseOrValue<string>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "price",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "register",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<string>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "setFeeManager",
    values: [PromiseOrValue<string>]
  ): string;

  decodeFunctionResult(functionFragment: "canReveal", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "commit", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getPartnerManager",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "makeCommitment",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "price", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "register", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setFeeManager",
    data: BytesLike
  ): Result;

  events: {
    "FeeManagerChanged(address,address)": EventFragment;
    "NameRegistered(address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "FeeManagerChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NameRegistered"): EventFragment;
}

export interface FeeManagerChangedEventObject {
  hostContract: string;
  feeManagerContract: string;
}
export type FeeManagerChangedEvent = TypedEvent<
  [string, string],
  FeeManagerChangedEventObject
>;

export type FeeManagerChangedEventFilter =
  TypedEventFilter<FeeManagerChangedEvent>;

export interface NameRegisteredEventObject {
  partner: string;
  duration: BigNumber;
}
export type NameRegisteredEvent = TypedEvent<
  [string, BigNumber],
  NameRegisteredEventObject
>;

export type NameRegisteredEventFilter = TypedEventFilter<NameRegisteredEvent>;

export interface IBaseRegistrar extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IBaseRegistrarInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    canReveal(
      commitment: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    commit(
      commitment: PromiseOrValue<BytesLike>,
      partner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getPartnerManager(overrides?: CallOverrides): Promise<[string]>;

    makeCommitment(
      label: PromiseOrValue<BytesLike>,
      nameOwner: PromiseOrValue<string>,
      secret: PromiseOrValue<BytesLike>,
      duration: PromiseOrValue<BigNumberish>,
      addr: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    price(
      name: PromiseOrValue<string>,
      expires: PromiseOrValue<BigNumberish>,
      duration: PromiseOrValue<BigNumberish>,
      partner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    register(
      name: PromiseOrValue<string>,
      nameOwner: PromiseOrValue<string>,
      secret: PromiseOrValue<BytesLike>,
      duration: PromiseOrValue<BigNumberish>,
      addr: PromiseOrValue<string>,
      partner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setFeeManager(
      feeManager: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  canReveal(
    commitment: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  commit(
    commitment: PromiseOrValue<BytesLike>,
    partner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getPartnerManager(overrides?: CallOverrides): Promise<string>;

  makeCommitment(
    label: PromiseOrValue<BytesLike>,
    nameOwner: PromiseOrValue<string>,
    secret: PromiseOrValue<BytesLike>,
    duration: PromiseOrValue<BigNumberish>,
    addr: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<string>;

  price(
    name: PromiseOrValue<string>,
    expires: PromiseOrValue<BigNumberish>,
    duration: PromiseOrValue<BigNumberish>,
    partner: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  register(
    name: PromiseOrValue<string>,
    nameOwner: PromiseOrValue<string>,
    secret: PromiseOrValue<BytesLike>,
    duration: PromiseOrValue<BigNumberish>,
    addr: PromiseOrValue<string>,
    partner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setFeeManager(
    feeManager: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    canReveal(
      commitment: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    commit(
      commitment: PromiseOrValue<BytesLike>,
      partner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    getPartnerManager(overrides?: CallOverrides): Promise<string>;

    makeCommitment(
      label: PromiseOrValue<BytesLike>,
      nameOwner: PromiseOrValue<string>,
      secret: PromiseOrValue<BytesLike>,
      duration: PromiseOrValue<BigNumberish>,
      addr: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<string>;

    price(
      name: PromiseOrValue<string>,
      expires: PromiseOrValue<BigNumberish>,
      duration: PromiseOrValue<BigNumberish>,
      partner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    register(
      name: PromiseOrValue<string>,
      nameOwner: PromiseOrValue<string>,
      secret: PromiseOrValue<BytesLike>,
      duration: PromiseOrValue<BigNumberish>,
      addr: PromiseOrValue<string>,
      partner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    setFeeManager(
      feeManager: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "FeeManagerChanged(address,address)"(
      hostContract?: null,
      feeManagerContract?: null
    ): FeeManagerChangedEventFilter;
    FeeManagerChanged(
      hostContract?: null,
      feeManagerContract?: null
    ): FeeManagerChangedEventFilter;

    "NameRegistered(address,uint256)"(
      partner?: PromiseOrValue<string> | null,
      duration?: null
    ): NameRegisteredEventFilter;
    NameRegistered(
      partner?: PromiseOrValue<string> | null,
      duration?: null
    ): NameRegisteredEventFilter;
  };

  estimateGas: {
    canReveal(
      commitment: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    commit(
      commitment: PromiseOrValue<BytesLike>,
      partner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getPartnerManager(overrides?: CallOverrides): Promise<BigNumber>;

    makeCommitment(
      label: PromiseOrValue<BytesLike>,
      nameOwner: PromiseOrValue<string>,
      secret: PromiseOrValue<BytesLike>,
      duration: PromiseOrValue<BigNumberish>,
      addr: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    price(
      name: PromiseOrValue<string>,
      expires: PromiseOrValue<BigNumberish>,
      duration: PromiseOrValue<BigNumberish>,
      partner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    register(
      name: PromiseOrValue<string>,
      nameOwner: PromiseOrValue<string>,
      secret: PromiseOrValue<BytesLike>,
      duration: PromiseOrValue<BigNumberish>,
      addr: PromiseOrValue<string>,
      partner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setFeeManager(
      feeManager: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    canReveal(
      commitment: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    commit(
      commitment: PromiseOrValue<BytesLike>,
      partner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getPartnerManager(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    makeCommitment(
      label: PromiseOrValue<BytesLike>,
      nameOwner: PromiseOrValue<string>,
      secret: PromiseOrValue<BytesLike>,
      duration: PromiseOrValue<BigNumberish>,
      addr: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    price(
      name: PromiseOrValue<string>,
      expires: PromiseOrValue<BigNumberish>,
      duration: PromiseOrValue<BigNumberish>,
      partner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    register(
      name: PromiseOrValue<string>,
      nameOwner: PromiseOrValue<string>,
      secret: PromiseOrValue<BytesLike>,
      duration: PromiseOrValue<BigNumberish>,
      addr: PromiseOrValue<string>,
      partner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setFeeManager(
      feeManager: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
