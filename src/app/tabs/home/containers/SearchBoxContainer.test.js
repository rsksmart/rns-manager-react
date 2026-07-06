import React from 'react';
import { fireEvent } from '@testing-library/react';

import searchReducer from '../../search/reducer';
import SearchBoxContainer from './SearchBoxContainer';

import multiLanguageStore from '../../../../../tests/config/multiLanguageStore';
import { renderWithProviders } from '../../../../../tests/testUtils';

describe('searchBoxContainer', () => {
  const storeSetup = { search: searchReducer };

  it('has default state', () => {
    const store = multiLanguageStore(storeSetup);
    expect(store.getState().search.domain).toBeFalsy();
    expect(store.getState().requestingOwner).toBeFalsy();
  });

  it('handles handleClick function and sets domain in reducer', () => {
    const store = multiLanguageStore(storeSetup);
    const { container } = renderWithProviders(<SearchBoxContainer />, { store });

    fireEvent.change(container.querySelector('input'), { target: { value: 'foobar' } });
    expect(container.querySelector('input').value).toBe('foobar');

    fireEvent.click(container.querySelector('button'));
    expect(store.getState().search.domain).toEqual('foobar');
  });
});
