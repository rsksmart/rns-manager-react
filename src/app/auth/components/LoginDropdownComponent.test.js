import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import LoginDropdownComponent from './LoginDropdownComponent';
import { mockStoreEnglish } from '../../../../tests/config/mockStore';
import { initialState } from '../reducer';

const store = mockStoreEnglish({ auth: { initialState } });

describe('LoginDropdownComponent', () => {
  const initProps = {
    handleLogin: jest.fn(),
    authError: false,
    getPreviousDomains: () => [],
    isLoggedIn: false,
    isWalletConnected: true,
    showPopUp: true,
    toggleShowPopUp: jest.fn(),
    disconnectDomain: jest.fn(),
    disconnectWallet: jest.fn(),
    redirectAdmin: jest.fn(),
  };

  const generateComponent = (localProps = {}) => {
    const combinedProps = { ...initProps, ...localProps };
    return <Provider store={store}><LoginDropdownComponent {...combinedProps} /></Provider>;
  };

  it('renders and is defined', () => {
    const wrapper = mount(generateComponent());
    expect(wrapper).toBeDefined();
  });

  describe('current domain', () => {
    it('hides current domain when false', () => {
      const wrapper = mount(generateComponent());
      expect(wrapper.find('.row.current')).toHaveLength(0);
    });

    it('shows current domain when true', () => {
      const wrapper = mount(generateComponent({ name: 'foobar.rsk', isLoggedIn: true }));
      expect(wrapper.find('.row.current')).toHaveLength(1);
    });

    it('handles redirectAdmin click', () => {
      const redirectAdmin = jest.fn();
      const wrapper = mount(generateComponent({ name: 'foobar.rsk', isLoggedIn: true, redirectAdmin }));
      wrapper.find('.current').find('.domain').find('button').simulate('click');
      expect(redirectAdmin).toHaveBeenCalledTimes(1);
    });
  });

  describe('previous domains', () => {
    const owner = '0x123';
    const getPreviousDomains = () => ([
      { domain: 'foobar', owner },
      { domain: 'bar.foobar', owner },
    ]);

    it('shows the previous domains', () => {
      const wrapper = mount(generateComponent({ getPreviousDomains }));
      expect(wrapper.find('li.previous').at(0).text()).toBe('foobar-');
      expect(wrapper.find('li.previous').at(1).text()).toBe('bar.foobar-');
    });

    it('handles login and disconnect click', () => {
      const disconnectDomain = jest.fn();
      const handleLogin = jest.fn();
      const wrapper = mount(
        generateComponent({ getPreviousDomains, handleLogin, disconnectDomain }),
      );

      expect(wrapper.find('li.previous')).toHaveLength(2);
      wrapper.find('li.previous').at(0).find('.domain button').simulate('click');
      expect(handleLogin).toBeCalledWith('foobar');

      // remove the item
      wrapper.find('li.previous').at(0).find('.options button').simulate('click');
      expect(disconnectDomain).toBeCalledWith('foobar');
      expect(wrapper.find('li.previous')).toHaveLength(1);
    });
  });
});
