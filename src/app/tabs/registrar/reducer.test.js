import reducer from './reducer';
import { REQUEST_GET_COST, RECEIVE_GET_COST } from './types';

describe('register reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {}))
      .toEqual(
        {
          gettingCost: false,
        },
      );
  });

  it('should handle REQUEST_GET_COST', () => {
    expect(
      reducer({}, {
        type: REQUEST_GET_COST,
      }),
    )
      .toEqual({
        gettingCost: true,
      });
  });

  it('should handle RECEIVE_GET_COST', () => {
    expect(
      reducer({}, {
        type: RECEIVE_GET_COST,
        rifCost: 12,
      }),
    ).toEqual({
      gettingCost: false,
      rifCost: 12,
    });
  });

  it('should handle REQUEST_GET_COST and RECEIVE_GET_COST', () => {
    expect(
      reducer({}, {
        type: REQUEST_GET_COST,
      }),
    )
      .toEqual({
        gettingCost: true,
      });

    expect(
      reducer({
        gettingCost: true,
      }, {
        type: RECEIVE_GET_COST,
        rifCost: 23,
      }),
    ).toEqual({
      gettingCost: false,
      rifCost: 23,
    });
  });

  it('should return the initial state when action is not implemented', () => {
    expect(reducer(undefined, {
      type: 'NOT_IMPLEMENTED',
    }))
      .toEqual(
        {
          gettingCost: false,
        },
      );
  });
});
