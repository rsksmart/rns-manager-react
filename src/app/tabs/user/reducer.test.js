
import reducer from './reducer';
import { CHANGE_MYCRYPTO_METAMASK } from './types';

describe('user reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {}))
      .toEqual(
        {
          viewMyCrypto: false,
        },
      );
  });

  it('should handle CHANGE_MYCRYPTO_METAMASK when viewMyCrypto: false ', () => {
    expect(
      reducer({}, {
        type: CHANGE_MYCRYPTO_METAMASK,
        viewMyCrypto: false,
      }),
    )
      .toEqual({
        viewMyCrypto: false,
      });
  });

  it('should handle CHANGE_MYCRYPTO_METAMASK when viewMyCrypto: true', () => {
    expect(
      reducer({}, {
        type: CHANGE_MYCRYPTO_METAMASK,
        viewMyCrypto: true,
      }),
    )
      .toEqual({
        viewMyCrypto: true,
      });
  });

  it('should return the initial state when action is not implemented', () => {
    expect(reducer(undefined, {
      type: 'NOT_IMPLEMENTED',
    }))
      .toEqual(
        {
          viewMyCrypto: false,
        },
      );
  });
});
