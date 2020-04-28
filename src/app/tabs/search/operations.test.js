import searchReducer from './reducer';
import searchOperation from './operations';

import multiLanguageStore from '../../../../tests/config/multiLanguageStore';

describe('searchBoxContainer', () => {
  const storeSetup = { search: searchReducer };

  it('searches for the domain via handleClick opperations', () => {
    const store = multiLanguageStore(storeSetup);
    console.log('setting up man!');
    return store.dispatch(searchOperation('jesse'))
      .then(() => {
        const searchState = store.getState().search;

        expect(searchState.domain).toEqual('jesse');
        expect(searchState.requestingOwner).toBeFalsy();
        expect(searchState.owner).toBe('0x3Dd03d7d6c3137f1Eb7582Ba5957b8A2e26f304A');
        expect(searchState.owned).toBeTruthy();
      });
  });
});
