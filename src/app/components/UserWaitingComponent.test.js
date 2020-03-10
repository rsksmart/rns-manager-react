import React from 'react';
import { mount } from 'enzyme';

import UserWaitingComponent from './UserWaitingComponent';

describe('UserWaitingComponent', () => {
  it('renders and matches snapshot', () => {
    const component = mount(<UserWaitingComponent message="Please Wait!" />);
    expect(component.find('p').text()).toBe('Please Wait!');
    expect(component).toMatchSnapshot();
  });
});
