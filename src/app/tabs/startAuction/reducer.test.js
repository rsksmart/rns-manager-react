import reducer from './reducer';
import { REQUEST_START_AUCTION, RECEIVE_START_AUCTION } from './types';

describe('startAuction reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {}))
    .toEqual(
    {
      loading: false
    });
  });

  it('should handle REQUEST_START_AUCTION', () => {
    expect(
      reducer({}, {
        type: REQUEST_START_AUCTION
      })
    )
    .toEqual({
      loading: true
    });
  });

  it('should handle RECEIVE_START_AUCTION', () => {
    expect(
      reducer({}, {
        type: RECEIVE_START_AUCTION
      })
    ).toEqual({
      loading: false
    });
  });

  it('should handle REQUEST_START_AUCTION and RECEIVE_START_AUCTION', () => {
    expect(
      reducer({}, {
        type: REQUEST_START_AUCTION
      })
    )
    .toEqual({
      loading: true
    });

    expect(
      reducer({
        loading: true
      }, {
        type: RECEIVE_START_AUCTION
      })
    ).toEqual({
      loading: false
    });
  });
});
