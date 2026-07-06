import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

import UserErrorComponent from './UserErrorComponent';
import mockStore from '../../../tests/config/mockStore';
import en from '../../languages/en.json';

const store = mockStore({
  close: en.close,
  same_value: en.same_value,
  resolve_not_set: en.resolve_not_set,
  could_not_encode_address: en.could_not_encode_address,
  transaction_receipt_failed: en.transaction_receipt_failed,
});

describe('UserErrorComponent', () => {
  it('renders and matches snapshot', () => {
    const { container } = render(
      <Provider store={store}><UserErrorComponent /></Provider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('renders correct title and message text', () => {
    const { container } = render(
      <Provider store={store}>
        <UserErrorComponent title="Test Title" message="Test Message!" />
      </Provider>,
    );

    expect(container.querySelector('strong').textContent).toEqual('Test Title');
    expect(container.querySelectorAll('p')[1].textContent).toEqual('Test Message!');
  });

  it('returns blank when visible is false', () => {
    const { container } = render(
      <Provider store={store}>
        <UserErrorComponent title="Test Title" message="Test Message!" visible={false} />
      </Provider>,
    );

    expect(container.firstChild).toBeNull();
  });

  it('returns standard message when sent a constant for no resolver name', () => {
    const { container } = render(
      <Provider store={store}>
        <UserErrorComponent message="ERROR_RESOLVE_NAME" visible />
      </Provider>,
    );

    expect(container.querySelectorAll('p')[1].textContent).toEqual(en.resolve_not_set);
  });

  it('returns standard message when sent a constant for same value', () => {
    const { container } = render(
      <Provider store={store}>
        <UserErrorComponent message="ERROR_SAME_VALUE" visible />
      </Provider>,
    );

    expect(container.querySelectorAll('p')[1].textContent).toEqual(en.same_value);
  });
});
