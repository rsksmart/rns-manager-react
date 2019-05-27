import reducer from '../../src/app/tabs/unseal/reducer'
import { REQUEST_UNSEAL, RECEIVE_UNSEAL } from '../../src/app/tabs/unseal/types';

var initialState = { loading: false };

describe('unseal reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })
})