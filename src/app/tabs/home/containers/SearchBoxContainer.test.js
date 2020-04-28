import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import searchReducer from '../../search/reducer';
import searchOperation from '../../search/operations';

import SearchBoxContainer from './SearchBoxContainer';

import multiLanguageStore from '../../../../../tests/config/multiLanguageStore';

describe('searchBoxContainer', () => {
  const storeSetup = { search: searchReducer };

  it('gets correct environment varialbe', () => {
    expect(process.env.REACT_APP_ENVIRONMENT).toEqual('test');
  });

  it('has default state', () => {
    const store = multiLanguageStore(storeSetup);
    expect(store.getState().search.domain).toBeFalsy();
    expect(store.getState().requestingOwner).toBeFalsy();
  });

  it('handles handleClick function and sets domain in reducer', () => {
    const store = multiLanguageStore(storeSetup);
    const component = mount(
      <Provider store={store}>
        <SearchBoxContainer />
      </Provider>,
    );

    component.find('input').simulate('change', { target: { value: 'foobar' } });
    expect(component.find('input').props().value).toBe('foobar');

    component.find('button').simulate('click');
    expect(store.getState().search.domain).toEqual('foobar');
  });

  it('searches for the domain via handleClick opperations', () => {
    const store = multiLanguageStore(storeSetup);
    console.log('setting up man!');
    return store.dispatch(searchOperation('jesse'))
      .then(() => {
        const searchState = store.getState().search;

        expect(searchState.domain).toEqual('jesse');
        expect(searchState.requestingOwner).toBeFalsy();
        expect(searchState.owner).toBe('asd');
        expect(searchState.owned).toBeTruthy();
      });
  });
});
