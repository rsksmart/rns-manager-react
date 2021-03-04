import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import SingleDomainComponent from './SingleDomainComponent';
import { mockStoreEnglish } from '../../../../tests/config/mockStore';

const store = mockStoreEnglish();

describe('SingleDomainComponent', () => {
  const initProps = {
    domain: 'foobar.rsk',
    handleTextClick: jest.fn(),
    handleDisconnectClick: jest.fn(),
  };
  const generateComponent = (localProps = {}) => {
    const combinedProps = { ...initProps, ...localProps };
    return <Provider store={store}><SingleDomainComponent {...combinedProps} /></Provider>;
  };

  it('displays the text and default className', () => {
    const wrapper = mount(generateComponent());
    expect(wrapper).toBeDefined();

    expect(wrapper.find('.domain').text()).toBe('foobar.rsk');
    expect(wrapper.find('li').props().className).toBe('row previous');
  });

  it('handles click events', () => {
    const handleTextClick = jest.fn();
    const handleDisconnectClick = jest.fn();

    const wrapper = mount(generateComponent({ handleTextClick, handleDisconnectClick }));

    wrapper.find('.domain button').simulate('click');
    expect(handleTextClick).toBeCalledWith('foobar.rsk');

    wrapper.find('.options button').simulate('click');
    expect(handleDisconnectClick).toBeCalledWith('foobar.rsk');
  });

  it('is the current row', () => {
    const wrapper = mount(generateComponent({ isCurrent: true }));
    expect(wrapper.find('li').props().className).toBe('row current');
  });
});
