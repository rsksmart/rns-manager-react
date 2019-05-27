import reducer from '../../src/app/tabs/finalize/reducer'
import { REQUEST_FINALIZE, RECEIVE_FINALIZE } from '../../src/app/tabs/finalize/types';

var initialState = { loading: false };

describe('unseal reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })
  it('should handle REQUEST_FINALIZE', () => {
    expect(reducer(undefined, { type: REQUEST_FINALIZE })).toEqual(
      {
        loading: true
      })
  })
  it('should handle RECEIVE_FINALIZE', () => {
    expect(reducer(undefined, { type: RECEIVE_FINALIZE })).toEqual(
      {
        loading: false
      })
  })
  it('should return initial state when action is not valid', () => {
    expect(reducer(undefined, { type: "INVALID_TYPE" })).toEqual(initialState)
  })
})