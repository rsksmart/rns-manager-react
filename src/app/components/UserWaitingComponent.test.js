import React from 'react';
import { render } from '@testing-library/react';

import UserWaitingComponent from './UserWaitingComponent';

describe('UserWaitingComponent', () => {
  it('renders and matches snapshot', () => {
    const { container } = render(<UserWaitingComponent message="Please Wait!" />);
    expect(container.querySelector('p').textContent).toBe('Please Wait!');
  });

  it('returns blank when visible is false', () => {
    const { container } = render(<UserWaitingComponent message="Test Message!" visible={false} />);
    expect(container.firstChild).toBeNull();
  });
});
