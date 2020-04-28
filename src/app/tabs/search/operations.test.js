/* eslint-disable arrow-body-style */
import searchReducer from './reducer';
import searchOperation from './operations';

import multiLanguageStore from '../../../../tests/config/multiLanguageStore';

describe('searchBoxContainer', () => {
  let store;
  beforeEach(() => {
    store = multiLanguageStore({ search: searchReducer });
  });

  it('searches for the domain that is taken ', () => {
    return store.dispatch(searchOperation('jesse'))
      .then(() => {
        const searchState = store.getState().search;
        expect(searchState.domain).toEqual('jesse');
        expect(searchState.requestingOwner).toBeFalsy();
        expect(searchState.owner).toBe('0x3Dd03d7d6c3137f1Eb7582Ba5957b8A2e26f304A');
        expect(searchState.owned).toBeTruthy();
      });
  });
  /*
  it('searches for the domain that is taken with the auction registry', () => {
    return store.dispatch(searchOperation('bitcoin'))
      .then(() => {
        const searchState = store.getState().search;
        expect(searchState.requestingOwner).toBeFalsy();
        expect(searchState.owned).toBeTruthy();
      });
  });
  */
  it('searches for a domain that is available', () => {
    return store.dispatch(searchOperation('foobar984590456'))
      .then(() => {
        const searchState = store.getState().search;
        expect(searchState.domain).toEqual('foobar984590456');
        expect(searchState.owned).toEqual(false);
        expect(searchState.rifCost).toBe(2);
      });
  });

  it('searches for a blocked domain', () => {
    return store.dispatch(searchOperation('foo'))
      .then(() => {
        const searchState = store.getState().search;
        expect(searchState.domain).toEqual('foo');
        expect(searchState.blocked).toBeTruthy();
      });
  });
});
