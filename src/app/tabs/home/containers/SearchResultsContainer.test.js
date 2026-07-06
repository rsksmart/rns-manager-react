import React from 'react';
import { fireEvent } from '@testing-library/react';

import searchReducer, { initialState } from '../../search/reducer';
import SearchResultsContainer from './SearchResultsContainer';

import multiLanguageStore from '../../../../../tests/config/multiLanguageStore';
import { requestDomainState, receiveDomainState, receiveDomainCost } from '../../search/actions';
import { renderWithProviders } from '../../../../../tests/testUtils';

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
    const { container } = renderWithProviders(<SearchResultsContainer />, { store });

    expect(container.querySelector('h3').textContent).toBe('foobar.rsk');
    expect(container.querySelector('span.rifPrice').textContent).toBe('4 rif');
    expect(container.querySelector('p.status').textContent).toBe('available');

    fireEvent.click(container.querySelector('button'));

    expect(store.getState().search).toEqual(initialState);
  });
});
