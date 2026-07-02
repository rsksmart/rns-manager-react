import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

import UserSuccessComponent from './UserSuccessComponent';
import mockStore from '../../../tests/config/mockStore';
import en from '../../languages/en.json';

const store = mockStore({
  close: en.close,
  view_explorer: en.view_explorer,
});

describe('UserSuccessComponent', () => {
  it('renders and matches snapshot', () => {
    const { container } = render(
      <Provider store={store}><UserSuccessComponent /></Provider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('renders correct title and message text', () => {
    const { container } = render(
      <Provider store={store}>
        <UserSuccessComponent title="Test Title" message="Test Message!" />
      </Provider>,
    );

    expect(container.querySelector('strong').textContent).toEqual('Test Title');
    expect(container.querySelectorAll('p')[2].textContent).toEqual('Test Message!');
  });

  it('renders with explorer address', () => {
    const { container } = render(
      <Provider store={store}>
        <UserSuccessComponent title="Test Title" message="Test Message!" address="0x12345" />
      </Provider>,
    );

    expect(container.querySelector('p.explorer').textContent).toEqual(en.view_explorer);
  });

  it('returns blank when visible is false', () => {
    const { container } = render(
      <Provider store={store}>
        <UserSuccessComponent title="Test Title" message="Test Message!" visible={false} />
      </Provider>,
    );

    expect(container.firstChild).toBeNull();
  });
});
