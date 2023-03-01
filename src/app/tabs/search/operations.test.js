/* eslint-disable arrow-body-style */
import searchReducer from './reducer';
import searchOperation from './operations';

import multiLanguageStore from '../../../../tests/config/multiLanguageStore';

describe('searchBoxContainer', () => {
  beforeEach(() => {
    jest.setTimeout(10000);
  });

  it('searches for the domain that is taken ', () => {
    const store = multiLanguageStore({ search: searchReducer });
    return store.dispatch(searchOperation('alice', 'default'))
      .then(() => {
        const searchState = store.getState().search;
        expect(searchState.domain).toEqual('alice');
        // expect(searchState.requestingOwner).toBeFalsy();
        expect(searchState.owned).toBeTruthy();
        // expect(searchState.owner).toBeTruthy();
      });
  });

  it('searches for the domain that is taken with the auction registry', () => {
    const store = multiLanguageStore({ search: searchReducer });
    return store.dispatch(searchOperation('david'))
      .then(() => {
        const searchState = store.getState().search;
        expect(searchState.owned).toBeTruthy();
        // expect(searchState.requestingOwner).toBeFalsy();
      });
  });

  it('searches for a domain that is available', () => {
    const store = multiLanguageStore({ search: searchReducer });
    return store.dispatch(searchOperation('foobar984590456', 'default'))
      .then(() => {
        const searchState = store.getState().search;
        expect(searchState.domain).toEqual('foobar984590456');
        expect(searchState.owned).toEqual(false);
        expect(searchState.rifCost).toBe(2);
      });
  });

  it.skip('searches for a blocked domain', () => {
    const store = multiLanguageStore({ search: searchReducer });
    return store.dispatch(searchOperation('foo', 'default'))
      .then(() => {
        const searchState = store.getState().search;
        expect(searchState.domain).toEqual('foo');
        expect(searchState.blocked).toBeTruthy();
      });
  });
});
