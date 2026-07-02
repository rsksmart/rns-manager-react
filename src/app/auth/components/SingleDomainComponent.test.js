import React from 'react';
import { Provider } from 'react-redux';
import { render, fireEvent } from '@testing-library/react';

import SingleDomainComponent from './SingleDomainComponent';
import { mockStoreEnglish } from '../../../../tests/config/mockStore';

const store = mockStoreEnglish();

describe('SingleDomainComponent', () => {
  const domain = 'foobar.rsk';
  const initProps = {
    domain,
    handleTextClick: jest.fn(),
    handleDisconnectClick: jest.fn(),
  };
  const generateComponent = (localProps = {}) => {
    const combinedProps = { ...initProps, ...localProps };
    return <Provider store={store}><SingleDomainComponent {...combinedProps} /></Provider>;
  };

  it('displays the text and default className', () => {
    const { container } = render(generateComponent());

    expect(container.querySelector('.domain').textContent).toBe(domain);
    expect(container.querySelector('li').className).toBe('row previous');
  });

  it('handles click events', () => {
    const handleTextClick = jest.fn();
    const handleDisconnectClick = jest.fn();

    const { container } = render(generateComponent({ handleTextClick, handleDisconnectClick }));

    fireEvent.click(container.querySelector('.domain button'));
    expect(handleTextClick).toBeCalledWith(domain);

    fireEvent.click(container.querySelector('.options button'));
    expect(handleDisconnectClick).toBeCalledWith(domain);
  });

  it('is the current row', () => {
    const { container } = render(generateComponent({ isCurrent: true }));
    expect(container.querySelector('li').className).toBe('row current');
  });
});
