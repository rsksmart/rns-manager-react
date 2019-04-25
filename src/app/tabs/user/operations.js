import { changeMyCryptoMetamask as changeMyCryptoMetamaskAction } from './actions';

export const changeMyCryptoMetamask = viewMyCrypto => dispatch => {
  console.log(viewMyCrypto)
  dispatch(changeMyCryptoMetamaskAction(viewMyCrypto));

  localStorage.setItem('viewMyCrypto', viewMyCrypto ? 'true' : 'false');
}