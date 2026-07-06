import React from 'react';
import { Provider } from 'react-redux';
import { render, fireEvent } from '@testing-library/react';

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
    const { container } = render(generateComponent());
    expect(container).toBeDefined();
  });

  describe('current domain', () => {
    it('hides current domain when false', () => {
      const { container } = render(generateComponent());
      expect(container.querySelectorAll('.row.current')).toHaveLength(0);
    });

    it('shows current domain when true', () => {
      const { container } = render(generateComponent({ name: 'foobar.rsk', isLoggedIn: true }));
      expect(container.querySelectorAll('.row.current')).toHaveLength(1);
    });

    it('handles redirectAdmin click', () => {
      const redirectAdmin = jest.fn();
      const { container } = render(
        generateComponent({ name: 'foobar.rsk', isLoggedIn: true, redirectAdmin }),
      );
      fireEvent.click(container.querySelector('.current .domain button'));
      expect(redirectAdmin).toHaveBeenCalledTimes(1);
    });
  });

  describe('previous domains', () => {
    const owner = '0x123';
    const getPreviousDomains = () => ([
      { domain: 'foobar', owner },
      { domain: 'bar.foobar', owner },
    ]);

    const previousList = container => container.querySelectorAll('li.previous');

    it('shows the previous domains', () => {
      const { container } = render(generateComponent({ getPreviousDomains }));
      expect(previousList(container)[0].textContent).toBe('foobar-');
      expect(previousList(container)[1].textContent).toBe('bar.foobar-');
    });

    it('handles login and disconnect click', () => {
      const disconnectDomain = jest.fn();
      const handleLogin = jest.fn();
      const { container } = render(
        generateComponent({ getPreviousDomains, handleLogin, disconnectDomain }),
      );

      expect(container.querySelectorAll('li.previous')).toHaveLength(2);
      fireEvent.click(previousList(container)[0].querySelector('.domain button'));
      expect(handleLogin).toBeCalledWith('foobar');

      // remove the item
      fireEvent.click(container.querySelectorAll('li.previous')[0].querySelector('.options button'));
      expect(disconnectDomain).toBeCalledWith('foobar');
      expect(container.querySelectorAll('li.previous')).toHaveLength(1);
    });
  });
});
