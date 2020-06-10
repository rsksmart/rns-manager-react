import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import mockStore from '../../../../../../tests/config/mockStore';
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
    const component = mount(
      <Provider store={store}>
        <NewRecordComponent {...initProps} />
      </Provider>,
    );
    expect(component).toMatchSnapshot();

    expect(component.find('option').props().value).toBe('CONTENT_BYTES');
  });

  it('handles interaction', () => {
    const handleSubmit = jest.fn();
    const localProps = {
      ...initProps,
      handleSubmit,
    };

    const component = mount(
      <Provider store={store}>
        <NewRecordComponent {...localProps} />
      </Provider>,
    );

    component.find('input').simulate('change', { target: { value: 'foo' } });
    component.find('button').at(0).simulate('click');
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

    const component = mount(
      <Provider store={store}>
        <NewRecordComponent {...localProps} />
      </Provider>,
    );

    expect(component.find('div.error p').at(1).text()).toBe('There was an error');
    component.find('button.close').simulate('click');
    expect(handleCloseMessage).toBeCalled();
  });
});
