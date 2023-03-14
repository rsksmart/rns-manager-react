import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import searchReducer from '../../search/reducer';
import SearchBoxContainer from './SearchBoxContainer';

import multiLanguageStore from '../../../../../tests/config/multiLanguageStore';

describe('searchBoxContainer', () => {
  const storeSetup = { search: searchReducer };

  it('has default state', () => {
    const store = multiLanguageStore(storeSetup);
    expect(store.getState().search.domain).toBeFalsy();
    expect(store.getState().requestingOwner).toBeFalsy();
  });

  it.skip('handles handleClick function and sets domain in reducer', () => {
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
});
