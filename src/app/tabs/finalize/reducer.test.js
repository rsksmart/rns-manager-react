import reducer from './reducer';
import { REQUEST_FINALIZE, RECEIVE_FINALIZE } from './types';

describe('finalize reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {}))
      .toEqual(
        {
          loading: false,
        },
      );
  });

  it('should handle REQUEST_FINALIZE', () => {
    expect(
      reducer({}, {
        type: REQUEST_FINALIZE,
      }),
    )
      .toEqual({
        loading: true,
      });
  });

  it('should handle RECEIVE_FINALIZE', () => {
    expect(
      reducer({}, {
        type: RECEIVE_FINALIZE,
      }),
    ).toEqual({
      loading: false,
    });
  });

  it('should handle REQUEST_FINALIZE and RECEIVE_FINALIZE', () => {
    expect(
      reducer({}, {
        type: REQUEST_FINALIZE,
      }),
    )
      .toEqual({
        loading: true,
      });

    expect(
      reducer({
        loading: true,
      }, {
        type: RECEIVE_FINALIZE,
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
