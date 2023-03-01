import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import '@nomiclabs/hardhat-ethers';
import { ethers } from 'hardhat';
import { Contract, ContractFactory, BigNumber } from 'ethers';

export const oneRBTC = BigNumber.from(10).pow(18);

export interface Factory<C extends Contract> extends ContractFactory {
  deploy: (...args: Array<unknown>) => Promise<C>;
}

export const deployContract = async <C extends Contract, A = {}>(
  contractName: string,
  constructorArgs: A extends {} ? A : {},
  factory?: Factory<C>,
  signer?: SignerWithAddress
): Promise<{
  contract: Contract;
  signers: SignerWithAddress[];
  contractFactory: Factory<C>;
}> => {
  const options = Object.values(constructorArgs);
  const contractFactory =
    factory ?? ((await ethers.getContractFactory(contractName)) as Factory<C>);
  const contract = signer
    ? await contractFactory.connect(signer).deploy(...options)
    : await contractFactory.deploy(...options);
  await contract.deployed();

  return {
    contract,
    signers: await ethers.getSigners(),
    contractFactory,
  };
};
