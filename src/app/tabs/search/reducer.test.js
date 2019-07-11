import reducer from './reducer';
import { REQUEST_DOMAIN_STATE, RECEIVE_DOMAIN_STATE } from './types';

describe('search reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {}))
      .toEqual(
        {
          auctionState: null,
          auctionStateLoading: false,
        },
      );
  });

  it('should handle REQUEST_DOMAIN_STATE', () => {
    expect(
      reducer({}, {
        type: REQUEST_DOMAIN_STATE,
      }),
    )
      .toEqual({
        auctionState: null,
        auctionStateLoading: true,
      });
  });

  it('should handle RECEIVE_DOMAIN_STATE', () => {
    expect(
      reducer({}, {
        type: RECEIVE_DOMAIN_STATE,
        state: '0',
      }),
    ).toEqual({
      auctionState: '0',
      auctionStateLoading: false,
    });
  });

  it('should handle REQUEST_DOMAIN_STATE and RECEIVE_DOMAIN_STATE', () => {
    expect(
      reducer({}, {
        type: REQUEST_DOMAIN_STATE,
      }),
    )
      .toEqual({
        auctionState: null,
        auctionStateLoading: true,
      });

    expect(
      reducer({
        auctionState: null,
        auctionStateLoading: true,
      }, {
        type: RECEIVE_DOMAIN_STATE,
        state: '1',
      }),
    ).toEqual({
      auctionState: '1',
      auctionStateLoading: false,
    });
  });

  it('should return the initial state when action is not implemented', () => {
    expect(reducer(undefined, {
      type: 'NOT_IMPLEMENTED',
    }))
      .toEqual(
        {
          auctionState: null,
          auctionStateLoading: false,
        },
      );
  });
});
