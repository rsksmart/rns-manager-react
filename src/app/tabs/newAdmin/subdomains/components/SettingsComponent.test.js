import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import mockStore from '../../../../../../tests/config/mockStore';
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
    const wrapper = mount(<Provider store={store}><SettingsComponent {...initProps} /></Provider>);
    expect(wrapper.find('p').text()).toBe('Wanna login?');
  });

  it('handles click button', () => {
    const handleClick = jest.fn();
    const wrapper = mount(
      <Provider store={store}><SettingsComponent {...initProps} login={handleClick} /></Provider>,
    );
    wrapper.find('button').simulate('click');
    expect(handleClick).toBeCalledTimes(1);
  });
});
