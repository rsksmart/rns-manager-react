import reducer from '../../src/app/tabs/finalize/reducer'
import { REQUEST_FINALIZE, RECEIVE_FINALIZE } from '../../src/app/tabs/finalize/types';

var initialState = { loading: false };

describe('unseal reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })
})