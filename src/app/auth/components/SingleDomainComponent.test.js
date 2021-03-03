import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import SingleDomainComponent from './SingleDomainComponent';
import mockStore from '../../../../tests/config/mockStore';

const store = mockStore({});

describe('SingleDomainComponent', () => {
  const initProps = {
    domain: 'foobar.rsk',
    handleTextClick: jest.fn(),
    handleDisconnectClick: jest.fn(),
  };

  it('displays the text and default className', () => {
    const wrapper = mount(
      <Provider store={store}><SingleDomainComponent {...initProps} /></Provider>,
    );
    expect(wrapper).toBeDefined();

    expect(wrapper.find('.domain').text()).toBe('foobar.rsk');
    expect(wrapper.find('li').props().className).toBe('row');
  });

  it('handles click events', () => {
    const textClick = jest.fn();
    const disconnectClick = jest.fn();

    const wrapper = mount(
      <Provider store={store}>
        <SingleDomainComponent
          {...initProps}
          handleTextClick={textClick}
          handleDisconnectClick={disconnectClick}
        />
      </Provider>,
    );

    wrapper.find('.domain button').simulate('click');
    expect(textClick).toBeCalledWith('foobar.rsk');

    wrapper.find('.options button').simulate('click');
    expect(disconnectClick).toBeCalledWith('foobar.rsk');
  });

  it('is the current row', () => {
    const wrapper = mount(
      <Provider store={store}><SingleDomainComponent {...initProps} isCurrent /></Provider>,
    );
    expect(wrapper.find('li').props().className).toBe('row current');
  });
});
