import React from 'react';
import mockStore from '../../../../../../tests/config/mockStore';
import { renderWithProviders } from '../../../../../../tests/testUtils';
import en from '../../../../../languages/en.json';

import RenewButtonComponent from './RenewButtonComponent';

const store = mockStore({
  expires_on: en.expires_on,
  renew: en.renew,
  domain_expired: en.domain_expired,
});

const handleClick = jest.fn();

const initProps = {
  domain: 'jesse.rsk',
  expires: 100,
  handleClick,
  checkingExpirationTime: false,
  isRenewOpen: false,
  isFifsMigrated: true,
};

describe('RenewButtonComponent', () => {
  it('renders without crashing', () => {
    const { container } = renderWithProviders(<RenewButtonComponent {...initProps} />, { store });
    expect(container).toBeTruthy();
  });

  it('expect renew section to be open', () => {
    const localProps = {
      ...initProps,
      isRenewOpen: true,
    };
    const { container } = renderWithProviders(<RenewButtonComponent {...localProps} />, { store });
    expect(container.querySelector('button')).toHaveClass('active');
  });

  it('expect nothing when expires is 0', () => {
    const localProps = {
      ...initProps,
      expires: 0,
    };
    const { container } = renderWithProviders(<RenewButtonComponent {...localProps} />, { store });
    expect(container.querySelector('button')).toBeDisabled();
  });
});
