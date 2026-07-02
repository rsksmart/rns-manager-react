import React from 'react';
import { fireEvent } from '@testing-library/react';
import mockStore from '../../../../../../tests/config/mockStore';
import { renderWithProviders } from '../../../../../../tests/testUtils';
import SettingsComponent from './SettingsComponent';

describe('Subdomain settings component', () => {
  const store = mockStore({
    login: 'Login',
    subomain_login: 'Wanna login?',
  });

  const initProps = {
    login: jest.fn(),
  };

  it('shows menu when address and owner are the same', () => {
    const { container } = renderWithProviders(<SettingsComponent {...initProps} />, { store });
    expect(container.querySelector('p').textContent).toBe('Wanna login?');
  });

  it('handles click button', () => {
    const handleClick = jest.fn();
    const { container } = renderWithProviders(
      <SettingsComponent {...initProps} login={handleClick} />,
      { store },
    );
    fireEvent.click(container.querySelector('button'));
    expect(handleClick).toBeCalledTimes(1);
  });
});
