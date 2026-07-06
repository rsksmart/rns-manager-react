import React from 'react';
import { Provider } from 'react-redux';
import { render, fireEvent } from '@testing-library/react';
import mockStore from '../../../../../tests/config/mockStore';
import en from '../../../../languages/en.json';

import AutoLoginComponent from './AutoLoginComponent';

const store = mockStore({
  log_in: en.log_in,
  admin_domain: en.admin_domain,
  register_another_domain: en.register_another_domain,
  your_domain_has_been_registered: en.your_domain_has_been_registered,
  view_explorer: en.view_explorer,
  close: en.close,
});

const renderComponent = (handleManageClick, handleRegisterNewClick) => render(
  <Provider store={store}>
    <AutoLoginComponent
      handleManageClick={handleManageClick}
      handleRegisterNewClick={handleRegisterNewClick}
      successTx="0x123456879..."
    />
  </Provider>,
);

describe('AutoLoginComponent', () => {
  it('should matches snapshot', () => {
    const { container } = renderComponent(jest.fn(), jest.fn());
    expect(container).toMatchSnapshot();
  });

  it('should call functions when buttons are clicked', () => {
    const handleAdminClick = jest.fn();
    const handleRegisterNewClick = jest.fn();
    const { container } = renderComponent(handleAdminClick, handleRegisterNewClick);
    const buttons = container.querySelectorAll('.btn-primary');

    expect(buttons[0].textContent).toBe(en.admin_domain);
    fireEvent.click(buttons[0]);
    expect(handleAdminClick).toHaveBeenCalledTimes(1);

    expect(buttons[1].textContent).toBe(en.register_another_domain);
    fireEvent.click(buttons[1]);
    expect(handleRegisterNewClick).toHaveBeenCalledTimes(1);
  });
});
