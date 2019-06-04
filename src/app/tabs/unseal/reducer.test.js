import reducer from './reducer';
import { REQUEST_UNSEAL, RECEIVE_UNSEAL } from './types';

describe('unseal reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {}))
    .toEqual(
    {
      loading: false
    });
  });

  it('should handle REQUEST_UNSEAL', () => {
    expect(
      reducer({}, {
        type: REQUEST_UNSEAL
      })
    )
    .toEqual({
      loading: true
    });
  });

  it('should handle RECEIVE_UNSEAL', () => {
    expect(
      reducer({}, {
        type: RECEIVE_UNSEAL
      })
    ).toEqual({
      loading: false
    });
  });

  it('should handle REQUEST_UNSEAL and RECEIVE_UNSEAL', () => {
    expect(
      reducer({}, {
        type: REQUEST_UNSEAL
      })
    )
    .toEqual({
      loading: true
    });

    expect(
      reducer({
        loading: true
      }, {
        type: RECEIVE_UNSEAL
      })
    ).toEqual({
      loading: false
    });
  });

  it('should return the initial state when action is not implemented', () => {
    expect(reducer(undefined, {
      type: 'NOT_IMPLEMENTED'
    }))
    .toEqual(
    {
      loading: false
    });
  });
});
