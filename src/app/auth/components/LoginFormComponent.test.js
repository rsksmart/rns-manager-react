import React from 'react';
import { Provider } from 'react-redux';
import { render, fireEvent } from '@testing-library/react';

import LoginFormComponent from './LoginFormComponent';
import { mockStoreEnglish } from '../../../../tests/config/mockStore';

const store = mockStoreEnglish();

describe('LoginFormComponent', () => {
  const initProps = {
    authError: false,
    showLoginInitState: false,
    handleLogin: jest.fn(),
    domainInputInitialState: '',
  };

  const generateComponent = (localProps = {}) => {
    const combinedProps = { ...initProps, ...localProps };
    return render(
      <Provider store={store}>
        <LoginFormComponent {...combinedProps} />
      </Provider>,
    );
  };

  it('renders and matches snapshot when closed', () => {
    const { container } = generateComponent();
    expect(container.querySelector('button').textContent).toBe('+ Add account');
  });

  it('loads the initial state of the input box', () => {
    const { container } = generateComponent({ showLoginInitState: true, domainInputInitialState: 'foobar' });
    expect(container.querySelector('input').value).toBe('foobar');
  });

  it('shows error when there is one', () => {
    const { container } = generateComponent({ showLoginInitState: true, authError: true });
    expect(container.querySelector('.error').textContent).toBe("You are not the domains's owner.");
  });

  describe('login events', () => {
    it('sends the domain when form is submitted', () => {
      const handleLogin = jest.fn();
      const { container } = generateComponent({ showLoginInitState: true, handleLogin });
      fireEvent.change(container.querySelector('input'), { target: { value: 'hello' } });
      fireEvent.click(container.querySelector('button.btn'));

      expect(handleLogin).toBeCalledWith('hello.rsk');
    });

    it('shows an error when domain is invalid', () => {
      const handleLogin = jest.fn();
      const { container } = generateComponent({
        showLoginInitState: true, domainInputInitialState: 'foobar!!', handleLogin,
      });

      fireEvent.click(container.querySelector('button.btn'));

      expect(container.querySelector('.error').textContent).toBe('Invalid name. Must be lower case characters and/or numbers');
      expect(handleLogin).toBeCalledTimes(0);
    });
  });
});
