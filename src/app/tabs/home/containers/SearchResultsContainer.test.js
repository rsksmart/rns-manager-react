import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import searchReducer, { initialState } from '../../search/reducer';
import SearchResultsContainer from './SearchResultsContainer';

import multiLanguageStore from '../../../../../tests/config/multiLanguageStore';
import { requestDomainState, receiveDomainState, receiveDomainCost } from '../../search/actions';

describe('searchResultsContainer', () => {
  let store;
  beforeEach(() => {
    store = multiLanguageStore({ search: searchReducer });
  });

  it('has parameters set', () => {
    // set state to received domain status open and cost
    store.dispatch(requestDomainState('foobar'));
    store.dispatch(receiveDomainState(true));
    store.dispatch(receiveDomainCost(4));

    // create container
    const wrapper = mount(
      <Provider store={store}>
        <SearchResultsContainer />
      </Provider>,
    );

    expect(wrapper.find('h3').text()).toBe('foobar.rsk');
    expect(wrapper.find('span.rifPrice').text()).toBe('4 rif');
    expect(wrapper.find('p.status').text()).toBe('available');

    wrapper.find('button').simulate('click');

    expect(store.getState().search).toEqual(initialState);
  });
});
