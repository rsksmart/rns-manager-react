import React from 'react';
import { Provider } from 'react-redux';
import { render, fireEvent } from '@testing-library/react';
import mockStore from '../../../../../tests/config/mockStore';
import en from '../../../../languages/en.json';

import SearchBoxComponent from './SearchBoxComponent';

const store = mockStore({
  search_placeholder: en.search_placeholder,
  search: en.search,
  blocked_domain: en.blocked_domain,
  invalid_name: en.invalid_name,
});

describe('SearchBoxComponent', () => {
  it('renders and matches snapshot', () => {
    const { container } = render(
      <Provider store={store}>
        <SearchBoxComponent handleClick={jest.fn()} />
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('handles successful interaction', () => {
    const handleClick = jest.fn();
    const { container } = render(
      <Provider store={store}>
        <SearchBoxComponent handleClick={handleClick} />
      </Provider>,
    );
    fireEvent.change(container.querySelector('input'), { target: { value: 'hello' } });
    fireEvent.click(container.querySelector('button'));

    expect(handleClick).toBeCalledWith('hello');
  });

  it('handles errors with interactions', () => {
    const handleClick = jest.fn();
    const { container } = render(
      <Provider store={store}>
        <SearchBoxComponent handleClick={handleClick} />
      </Provider>,
    );

    fireEvent.change(container.querySelector('input'), { target: { value: 'foo' } });
    fireEvent.click(container.querySelector('button'));
    expect(container.querySelector('.errorMessage p').textContent).toBe(en.blocked_domain);

    fireEvent.change(container.querySelector('input'), { target: { value: 'foobar!' } });
    fireEvent.click(container.querySelector('button'));
    expect(container.querySelector('.errorMessage p').textContent).toBe(en.invalid_name);

    expect(handleClick).toBeCalledTimes(0);
  });

  it('converts uppercase to lower when searching', () => {
    const handleClick = jest.fn();
    const { container } = render(
      <Provider store={store}>
        <SearchBoxComponent handleClick={handleClick} />
      </Provider>,
    );

    fireEvent.change(container.querySelector('input'), { target: { value: 'UPPERCASEDOMAIN' } });
    fireEvent.click(container.querySelector('button'));

    expect(handleClick).toBeCalledWith('uppercasedomain');
  });
});
