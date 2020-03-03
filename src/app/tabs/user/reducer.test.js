
import reducer from './reducer';

describe('user reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {}))
      .toEqual(
        {},
      );
  });
});
