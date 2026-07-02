import React from 'react';
import mockStore from '../../../../../tests/config/mockStore';
import en from '../../../../languages/en.json';
import { renderWithProviders } from '../../../../../tests/testUtils';

import SearchResultsComponent from './SearchResultsComponent';

const store = mockStore({
  results: en.results,
  available: en.available,
  domain_not_available: en.domain_not_available,
  register: en.register,
  search_for_another: en.search_for_another,
  year: en.year,
});

const handleClick = jest.fn();

describe('SearchResultsComponent', () => {
  it('renders and matches snapshot when available', () => {
    const { container } = renderWithProviders(
      <SearchResultsComponent
        domain="foobar"
        available
        isSearching={false}
        blocked={false}
        rifCost={6}
        handleClick={handleClick}
      />,
      { store, withRouter: true },
    );

    expect(container).toMatchSnapshot();

    expect(container.querySelector('h3').textContent).toBe('foobar.rsk');
    expect(container.querySelector('.status').textContent).toBe('available');
    expect(container.querySelector('p.cost').textContent).toBe('6 rif/year');
  });

  it('renders and matches snapshot when not available', () => {
    const { container } = renderWithProviders(
      <SearchResultsComponent
        domain="foobar"
        available={false}
        blocked={false}
        isSearching={false}
        rifCost={2}
        handleClick={handleClick}
      />,
      { store, withRouter: true },
    );

    expect(container).toMatchSnapshot();

    expect(container.querySelector('h3').textContent).toBe('foobar.rsk');
    expect(container.querySelector('.status').textContent).toBe('not available');
  });

  it('displays nothing when no domain is provided', () => {
    const { container } = renderWithProviders(
      <SearchResultsComponent
        available={false}
        blocked={false}
        isSearching={false}
        rifCost={2}
        handleClick={handleClick}
      />,
      { store, withRouter: true },
    );

    expect(container.firstChild).toBeFalsy();
  });
});
