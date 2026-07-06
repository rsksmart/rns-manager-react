import React from 'react';
import { fireEvent } from '@testing-library/react';
import mockStore from '../../../../../../tests/config/mockStore';
import { renderWithProviders } from '../../../../../../tests/testUtils';
import en from '../../../../../languages/en.json';

import UpgradeComponent from './UpgradeComponent';

const store = mockStore({
  upgrade: en.upgrade,
  upgrade_domain: en.upgrade_domain,
  upgrade_domain_explanation: en.upgrade_domain_explanation,
});

const renderComponent = (handleClick = jest.fn()) => renderWithProviders(
  <UpgradeComponent
    isFifsMigrated={false}
    isMigrating={false}
    handleClick={handleClick}
  />,
  { store },
);

describe('UpgradeComponent', () => {
  it('renders and matches snapshop', () => {
    const { container } = renderComponent();
    expect(container).toMatchSnapshot();
  });

  it('calls function when clicked', () => {
    const handleClick = jest.fn();
    const { container } = renderComponent(handleClick);
    fireEvent.click(container.querySelector('button'));
    expect(handleClick).toBeCalled();
  });
});
