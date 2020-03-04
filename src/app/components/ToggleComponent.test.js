import React from 'react';
import { mount } from 'enzyme';
import ToggleComponent from './ToggleComponent';


describe('toggleComponent', () => {
  const handleChange = jest.fn();
  it('defaults matches snapshot', () => {
    const component = mount(<ToggleComponent onChange={handleChange} />);
    expect(component.find('input[type="checkbox"]').props().value).toBeFalsy();

    const activeButton = component.find('button.active');
    expect(activeButton.text()).toEqual('leftLabel');

    expect(component).toMatchSnapshot();
  });

  it('toggleSwitch active matches snapshot', () => {
    const component = mount(<ToggleComponent onChange={handleChange} value />);
    expect(component.find('input[type="checkbox"]').props().value).toBeFalsy();

    const activeButton = component.find('button.active');
    expect(activeButton.text()).toEqual('rightLabel');

    expect(component).toMatchSnapshot();
  });

  it('sets the text from the parent', () => {
    const component = mount(
      <ToggleComponent labelLeft="LEFT" labelRight="RIGHT" onChange={handleChange} />,
    );

    expect(component.find('button.left').text()).toEqual('LEFT');
    expect(component.find('button.right').text()).toEqual('RIGHT');
  });
});
