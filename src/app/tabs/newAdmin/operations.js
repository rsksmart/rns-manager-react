import Web3 from 'web3';
import { keccak_256 as sha3 } from 'js-sha3';

import {
  rskOwner as rskOwnerAddress,
} from '../../adapters/configAdapter';
import {
  rskOwnerAbi,
} from './abis.json';
import { gasPrice as defaultGasPrice } from '../../adapters/gasPriceAdapter';
import {
  notifyTx, txTypes,
} from '../../notifications';

import {
  toggleBasicAdvanced, requestTransferDomain, receiveTransferDomain, errorTransferDomain,
} from './actions';

const web3 = new Web3(window.ethereum);
const rskOwner = new web3.eth.Contract(
  rskOwnerAbi, rskOwnerAddress, { gasPrice: defaultGasPrice },
);

export const start = () => (dispatch) => {
  const showAdvancedView = localStorage.getItem('adminAdvancedView');
  dispatch(toggleBasicAdvanced(showAdvancedView === 'true'));
};

export const toggleBasicAdvancedSwitch = showAdvancedView => (dispatch) => {
  dispatch(toggleBasicAdvanced(showAdvancedView));
  localStorage.setItem('adminAdvancedView', showAdvancedView);
};

export const transferDomainConfirmed = () => (dispatch) => {
  console.log('TRANSFER HAS BEEN COMPLETE!', dispatch);
  dispatch(receiveTransferDomain());
};

export const transferDomain = (name, addressToTransfer, sender) => (dispatch) => {
  dispatch(requestTransferDomain());

  console.log(name, addressToTransfer, sender);

  const label = name.split('.')[0];

  return new Promise((resolve) => {
    const hash = `0x${sha3(label)}`;

    rskOwner.methods.safeTransferFrom(sender, addressToTransfer, hash).send(
      { from: sender },
      (error, result) => {
        if (error) {
          return resolve(dispatch(errorTransferDomain(error.message)));
        }
        return resolve(dispatch(notifyTx(result, '', { type: txTypes.TRANSFER_DOMAIN_TOKEN }, transferDomainConfirmed)));
      },
    );
  });
};
