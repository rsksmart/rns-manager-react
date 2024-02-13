import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import UserErrorComponent from './UserErrorComponent';
import mockStore from '../../../tests/config/mockStore';
import en from '../../languages/en.json';

const store = mockStore({
  close: en.close,
  same_value: en.same_value,
  resolve_not_set: en.resolve_not_set,
  could_not_encode_address: en.could_not_encode_address,
  transaction_receipt_failed: en.transaction_receipt_failed,
  user_rejected_transaction: en.user_rejected_transaction,
});

describe('UserErrorComponent', () => {
  it('renders and matches snapshot', () => {
    const component = mount(<Provider store={store}><UserErrorComponent /></Provider>);
    expect(component).toMatchSnapshot();
  });

  it('renders correct title and message text', () => {
    const component = mount(
      <Provider store={store}>
        <UserErrorComponent title="Test Title" message="Test Message!" />
      </Provider>,
    );

    expect(component.find('strong').text()).toEqual('Test Title');
    expect(component.find('p').at(1).text()).toEqual('Test Message!');
  });

  it('returns blank when visible is false', () => {
    const component = mount(
      <Provider store={store}>
        <UserErrorComponent title="Test Title" message="Test Message!" visible={false} />
      </Provider>,
    );

    expect(component.html()).toEqual('');
  });

  it('returns standard message when sent a constant for no resolver name', () => {
    const component = mount(
      <Provider store={store}>
        <UserErrorComponent message="ERROR_RESOLVE_NAME" visible />
      </Provider>,
    );

    expect(component.find('p').at(1).text()).toEqual(en.resolve_not_set);
  });

  it('returns standard message when sent a constant for same value', () => {
    const component = mount(
      <Provider store={store}>
        <UserErrorComponent message="ERROR_SAME_VALUE" visible />
      </Provider>,
    );

    expect(component.find('p').at(1).text()).toEqual(en.same_value);
  });

  it('Returns user friendly message when the transaction is rejected', () => {
    const component = mount(
      <Provider store={store}>
        <UserErrorComponent message="user rejected transaction bla bla bla" visible />
      </Provider>,
    );

    expect(component.find('p').at(1).text()).toEqual(en.user_rejected_transaction);
  });
});
