import reducer from '../../src/app/tabs/startAuction/reducer'
import { REQUEST_START_AUCTION, RECEIVE_START_AUCTION } from '../../src/app/tabs/startAuction/types';

var initialState = { loading: false };

describe('startAuction reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })
  it('should handle REQUEST_START_AUCTION', () => {
    expect(reducer(undefined, { type: REQUEST_START_AUCTION })).toEqual(
      {
        loading: true
      })
  })
})