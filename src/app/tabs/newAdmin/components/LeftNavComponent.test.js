import React from 'react';
import { mockStoreEnglish } from '../../../../../tests/config/mockStore';
import { renderWithProviders } from '../../../../../tests/testUtils';

import LeftNavComponent from './LetftNavComponent';

const store = mockStoreEnglish();

describe('LeftNavComponent', () => {
  it('matches snapshot', () => {
    const { container } = renderWithProviders(
      <LeftNavComponent location="/newAdmin" advancedView={false} domain="foobar.rsk" />,
      { store, withRouter: true },
    );
    expect(container).toBeDefined();
  });

  it('shows all items when advancedView is true', () => {
    const { container } = renderWithProviders(
      <LeftNavComponent location="/newAdmin/subdomains" advancedView domain="foobar.rsk" />,
      { store, withRouter: true },
    );
    expect(container.querySelectorAll('li').length).toBe(6);
  });

  it('sets correct item active when passed', () => {
    const { container } = renderWithProviders(
      <LeftNavComponent location="/newAdmin/subdomains" advancedView={false} domain="foobar.rsk" />,
      { store, withRouter: true },
    );

    expect(container.querySelector('a.active').textContent).toEqual('subdomains');
    expect(container.querySelectorAll('li').length).toBe(4);
  });

  it('sets home as active when resolver is passed, but advancedView is false.', () => {
    const { container } = renderWithProviders(
      <LeftNavComponent location="/newAdmin/resolver" advancedView={false} domain="foobar.rsk" />,
      { store, withRouter: true },
    );

    expect(container.querySelector('a.active').textContent).toEqual('Domain info');
  });
});
