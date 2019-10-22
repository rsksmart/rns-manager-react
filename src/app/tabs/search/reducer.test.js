import reducer from './reducer';
import { REQUEST_DOMAIN_STATE, RECEIVE_DOMAIN_STATE, BLOCKED_DOMAIN } from './types';

describe('search reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {}))
      .toEqual(
        {
          owned: undefined,
          domainStateLoading: false,
          blocked: undefined,
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
        domainStateLoading: true,
      });
  });

  it('should handle BLOCKED_DOMAIN', () => {
    expect(
      reducer({}, {
        type: BLOCKED_DOMAIN,
      }),
    ).toEqual({
      domainStateLoading: false,
      blocked: true,
    });
  });

  it('should handle RECEIVE_DOMAIN_STATE', () => {
    expect(
      reducer({}, {
        type: RECEIVE_DOMAIN_STATE,
        owned: true,
      }),
    ).toEqual({
      owned: true,
      domainStateLoading: false,
      blocked: false,
    });
  });

  it('should handle REQUEST_DOMAIN_STATE and RECEIVE_DOMAIN_STATE', () => {
    expect(
      reducer({}, {
        type: REQUEST_DOMAIN_STATE,
      }),
    )
      .toEqual({
        domainStateLoading: true,
      });

    expect(
      reducer({
        owned: undefined,
        domainStateLoading: true,
      }, {
        type: RECEIVE_DOMAIN_STATE,
        owned: false,
      }),
    ).toEqual({
      owned: false,
      domainStateLoading: false,
      blocked: false,
    });
  });

  it('should return the initial state when action is not implemented', () => {
    expect(reducer(undefined, {
      type: 'NOT_IMPLEMENTED',
    }))
      .toEqual(
        {
          owned: undefined,
          domainStateLoading: false,
          blocked: undefined,
        },
      );
  });
});
