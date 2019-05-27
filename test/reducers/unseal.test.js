import reducer from '../../src/app/tabs/unseal/reducer'
import { REQUEST_UNSEAL, RECEIVE_UNSEAL } from '../../src/app/tabs/unseal/types';

var initialState = { loading: false };

describe('unseal reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })
  it('should handle REQUEST_UNSEAL', () => {
    expect(reducer(undefined, { type: REQUEST_UNSEAL })).toEqual(
      {
        loading: true
      })
  })
  it('should handle RECEIVE_UNSEAL', () => {
    expect(reducer(undefined, { type: RECEIVE_UNSEAL })).toEqual(
      {
        loading: false
      })
  })
})