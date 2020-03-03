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
    const component = mount(<ToggleComponent onChange={handleChange} initialValue />);
    expect(component.find('input[type="checkbox"]').props().value).toBeFalsy();

    const activeButton = component.find('button.active');
    expect(activeButton.text()).toEqual('rightLabel');

    expect(component).toMatchSnapshot();
  });

  it('changes value when switch is toggled', () => {
    const localHandleChange = jest.fn();
    const component = mount(<ToggleComponent onChange={localHandleChange} />);
    const checkBox = () => component.find('input[type="checkbox"]');

    expect(checkBox().props().checked).toBeFalsy();
    checkBox().simulate('change', { target: { checked: false } });
    expect(checkBox().props().checked).toBeTruthy();
    expect(localHandleChange.mock.calls.length).toBe(1);

    expect(component.find('button.active').text()).toBe('rightLabel');
  });

  it('sets the text from the parent', () => {
    const component = mount(
      <ToggleComponent labelLeft="LEFT" labelRight="RIGHT" onChange={handleChange} />,
    );

    expect(component.find('button.left').text()).toEqual('LEFT');
    expect(component.find('button.right').text()).toEqual('RIGHT');
  });

  it('keeps active when button is clicked', () => {
    const localHandleChange = jest.fn();
    const component = mount(<ToggleComponent onChange={localHandleChange} />);

    component.find('button.left').simulate('click');
    expect(localHandleChange.mock.calls.length).toBe(1);
    expect(component.find('button.left').props().className).toEqual('left active');
    expect(component.find('button.right').props().className).toEqual('right');

    // click button twice
    component.find('button.right').simulate('click').simulate('click');
    expect(localHandleChange.mock.calls.length).toBe(3);
    expect(component.find('button.right').props().className).toEqual('right active');
  });
});
