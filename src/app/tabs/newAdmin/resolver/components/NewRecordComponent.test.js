import React from 'react';
import { fireEvent } from '@testing-library/react';
import mockStore from '../../../../../../tests/config/mockStore';
import { renderWithProviders } from '../../../../../../tests/testUtils';
import en from '../../../../../languages/en.json';

import NewRecordComponent from './NewRecordComponent';

const store = mockStore({
  add: en.add,
  add_records: en.add_records,
  content_bytes: en.content_bytes,
  wait_transation_confirmed: en.wait_transation_confirmed,
  close: en.close,
  same_value: en.same_value,
  resolve_not_set: en.resolve_not_set,
  could_not_encode_address: en.could_not_encode_address,
  transaction_receipt_failed: en.transaction_receipt_failed,
});

const initProps = {
  content: [[
    'CONTENT_BYTES',
    {
      value: '',
      isRequesting: false,
      isWaiting: false,
      successTx: '',
      errorMessage: '',
    },
  ]],
  handleSubmit: jest.fn(),
  handleCloseMessage: jest.fn(),
};

describe('NewRecordComponent', () => {
  it('renders and matches snapshot', () => {
    const { container } = renderWithProviders(<NewRecordComponent {...initProps} />, { store });
    expect(container).toMatchSnapshot();

    expect(container.querySelector('option').value).toBe('CONTENT_BYTES');
  });

  it('handles interaction', () => {
    const handleSubmit = jest.fn();
    const localProps = {
      ...initProps,
      handleSubmit,
    };

    const { container } = renderWithProviders(<NewRecordComponent {...localProps} />, { store });

    fireEvent.change(container.querySelector('input'), { target: { value: 'foo' } });
    fireEvent.click(container.querySelectorAll('button')[0]);
    expect(handleSubmit).toHaveBeenCalledWith('CONTENT_BYTES', 'foo');
  });

  it('shows and handles errors', () => {
    const handleCloseMessage = jest.fn();
    const localProps = {
      ...initProps,
      content: [[
        'CONTENT_BYTES',
        {
          value: '',
          isRequesting: false,
          isWaiting: false,
          successTx: '',
          errorMessage: 'There was an error',
        },
      ]],
      handleCloseMessage,
    };

    const { container } = renderWithProviders(<NewRecordComponent {...localProps} />, { store });

    expect(container.querySelectorAll('div.error p')[1].textContent).toBe('There was an error');
    fireEvent.click(container.querySelector('button.close'));
    expect(handleCloseMessage).toBeCalled();
  });
});
