import { requestDomainState, receiveDomainState } from './actions';
import { keccak_256 as sha3 } from 'js-sha3';
import { registrar as registrarAddress } from '../../../config/contracts';
import { notifyError } from '../../notifications';

export const getAuctionState = domain => dispatch => {
  if (!domain) {
    dispatch(receiveDomainState(''));
    return;
  }

  dispatch(requestDomainState());

  const registrar = window.web3.eth.contract([
    {
      'constant': true,
      'inputs': [
        { 'name': '_hash', 'type': 'bytes32' }
      ],
      'name': 'entries',
      'outputs': [
        { 'name': '', 'type': 'uint8' },
        { 'name': '', 'type': 'address' },
        { 'name': '', 'type': 'uint256' },
        { 'name': '', 'type': 'uint256' },
        { 'name': '', 'type': 'uint256' }
      ],
      'payable': false,
      'stateMutability': 'view',
      'type': 'function'
    }
  ]).at(registrarAddress);

  const hash = '0x' + sha3(domain.split('.')[0]);

  return new Promise(resolve => {
    registrar.entries(hash, (error, result) => {
      if (error) return resolve(dispatch(notifyError(error.message)));

      let state = result[0].toNumber();

      if (state === 2) {
        const deedAddress = result[1];

        const deed = window.web3.eth.contract([
          {
            'constant': true,
            'inputs': [],
            'name': 'expirationDate',
            'outputs': [
              {
                'name': '',
                'type': 'uint256'
              }
            ],
            'payable': false,
            'stateMutability': 'view',
            'type': 'function'
          }
        ]).at(deedAddress);

        return deed.expirationDate((errorDeed, resultDeed) => {
          if (errorDeed) return resolve(dispatch(notifyError(errorDeed.message)));

          const expirationDate = resultDeed.toNumber();
          const status = expirationDate === 0 ? 2 : 5;

          return resolve(dispatch(receiveDomainState(status)));
        });
      }

      return resolve(dispatch(receiveDomainState(state)));
    });
  });
};
