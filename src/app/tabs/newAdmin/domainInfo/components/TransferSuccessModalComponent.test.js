import React from 'react';
import { fireEvent } from '@testing-library/react';
import mockStore from '../../../../../../tests/config/mockStore';
import { renderWithProviders } from '../../../../../../tests/testUtils';
import en from '../../../../../languages/en.json';

import TransferSuccessModalComponent from './TransferSuccessModalComponent';

const store = mockStore({
  was_transfered: en.was_transfered,
  register_new_domain: en.upgrade_domain,
  login_another_domain: en.login_another_domain,
});

describe('TransferSuccessModalComponent', () => {
  it('calls function with value when clicked', () => {
    const handleClick = jest.fn();
    renderWithProviders(
      <TransferSuccessModalComponent domain="jesse.rsk" handleClick={handleClick} />,
      { store },
    );

    // react-bootstrap's Modal renders into a portal on document.body, not inside `container`.
    const buttons = document.querySelectorAll('button');
    fireEvent.click(buttons[0]);
    expect(handleClick).toBeCalledWith('newAdmin');
    fireEvent.click(buttons[1]);
    expect(handleClick).toBeCalledWith('search');

    expect(handleClick).toHaveBeenCalledTimes(2);
  });
});
