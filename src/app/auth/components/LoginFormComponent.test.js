import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import LoginDropdownComponent from './LoginFormComponent';
import mockStore from '../../../../tests/config/mockStore';

const store = mockStore({
  not_domains_owner_message: 'You are not the owner',
  enter: 'enter',
  your_domain: 'your domain',
  add_account: 'add account',
  invalid_name: 'invalid name',
});

describe('LoginDropdownComponent', () => {
  const initProps = {
    authError: false,
    showLoginInitState: false,
    handleLogin: jest.fn(),
    domainInputInitialState: '',
  };

  const generateComponent = (localProps = {}) => {
    const combinedProps = { ...initProps, ...localProps };
    return mount(
      <Provider store={store}>
        <LoginDropdownComponent {...combinedProps} />
      </Provider>,
    );
  };

  it('renders and matches snapshot when closed', () => {
    const wrapper = generateComponent();
    expect(wrapper.find('button').text()).toBe('+ add account');
  });

  it('loads the initial state of the input box', () => {
    const wrapper = generateComponent({ showLoginInitState: true, domainInputInitialState: 'foobar' });
    expect(wrapper.find('input').props().value).toBe('foobar');
  });

  it('shows error when there is one', () => {
    const wrapper = generateComponent({ showLoginInitState: true, authError: true });
    expect(wrapper.find('.error').text()).toBe('You are not the owner');
  });

  describe('login events', () => {
    it('sends the domain when form is submitted', () => {
      const handleLogin = jest.fn();
      const wrapper = generateComponent({ showLoginInitState: true, handleLogin });
      wrapper.find('input').simulate('change', { target: { value: 'hello' } });
      wrapper.find('button.btn').simulate('click');

      expect(handleLogin).toBeCalledWith('hello.rsk');
    });

    it('shows an error when domain is invalid', () => {
      const handleLogin = jest.fn();
      const wrapper = generateComponent({ showLoginInitState: true, domainInputInitialState: 'foobar!!', handleLogin });

      wrapper.find('button.btn').simulate('click');

      expect(wrapper.find('.error').text()).toBe('invalid name');
      expect(handleLogin).toBeCalledTimes(0);
    });
  });
});
