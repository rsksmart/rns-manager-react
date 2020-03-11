import Web3 from 'web3';
import { keccak_256 as sha3 } from 'js-sha3';

import {
  rskOwner as rskOwnerAddress,
} from '../../adapters/configAdapter';
import { rskOwnerAbi } from './domainInfo/abis.json';
import { gasPrice as defaultGasPrice } from '../../adapters/gasPriceAdapter';

import {
  toggleBasicAdvanced, checkIfSubdomain, requestCheckTokenOwner, receiveCheckTokenOwner,
  errorCheckTokenOwner,
} from './actions';

export const checkIfSubdomainOrTokenOwner = domain => async (dispatch) => {
  const labelsAmount = domain.split('.').length;

  if (labelsAmount > 2) {
    dispatch(checkIfSubdomain(true));
  }

  const label = domain.split('.')[0];
  const accounts = await window.ethereum.enable();
  const currentAddress = accounts[0];

  dispatch(requestCheckTokenOwner());

  const hash = `0x${sha3(label)}`;

  const web3 = new Web3(window.ethereum);
  const rskOwner = new web3.eth.Contract(
    rskOwnerAbi, rskOwnerAddress, { gasPrice: defaultGasPrice },
  );

  rskOwner.methods.ownerOf(hash).call((error, result) => {
    if (error) {
      dispatch(errorCheckTokenOwner());
      return;
    }

    const domainOwner = result;

    dispatch(receiveCheckTokenOwner(
      domainOwner.toLowerCase() === currentAddress.toLowerCase(),
      domainOwner,
    ));
  });
};

export const start = domian => (dispatch) => {
  const showAdvancedView = localStorage.getItem('adminAdvancedView');
  dispatch(toggleBasicAdvanced(showAdvancedView === 'true'));
  dispatch(checkIfSubdomainOrTokenOwner(domian));
};

export const toggleBasicAdvancedSwitch = showAdvancedView => (dispatch) => {
  dispatch(toggleBasicAdvanced(showAdvancedView));
  localStorage.setItem('adminAdvancedView', showAdvancedView);
};
