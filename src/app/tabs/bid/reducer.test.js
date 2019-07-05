import reducer from './reducer';
import { REQUEST_BID, RECEIVE_BID } from './types';

describe('bid reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {}))
      .toEqual(
        {
          loading: false,
        },
      );
  });

  it('should handle REQUEST_BID', () => {
    expect(
      reducer({}, {
        type: REQUEST_BID,
      }),
    )
      .toEqual({
        loading: true,
      });
  });

  it('should handle RECEIVE_BID', () => {
    expect(
      reducer({}, {
        type: RECEIVE_BID,
      }),
    ).toEqual({
      loading: false,
    });
  });

  it('should handle REQUEST_BID and RECEIVE_BID', () => {
    expect(
      reducer({}, {
        type: REQUEST_BID,
      }),
    )
      .toEqual({
        loading: true,
      });

    expect(
      reducer({
        loading: true,
      }, {
        type: RECEIVE_BID,
      }),
    ).toEqual({
      loading: false,
    });
  });

  it('should return the initial state when action is not implemented', () => {
    expect(reducer(undefined, {
      type: 'NOT_IMPLEMENTED',
    }))
      .toEqual(
        {
          loading: false,
        },
      );
  });
});
