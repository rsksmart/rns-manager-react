import React from 'react';
import { mount } from 'enzyme';

import AddressInputComponent from './AddressInputComponent';

describe('AddressInputComponent', () => {
  const initProps = {
    allowDelete: true,
    label: 'Label',
    value: 'Value',
    handleErrorClose: jest.fn(),
    handleSuccessClose: jest.fn(),
    handleSubmit: jest.fn(),
    handleDelete: jest.fn(),
    strings: {
      cancel: 'cancel string',
      delete: 'delete string',
      delete_confirm_text: 'delete confirm text',
      edit: 'edit text',
      edit_placeholder: 'placeholder text',
      edit_propmt: 'edit prompt text',
      error_title: 'error title text',
      error_message: 'error message text',
      submit: 'submit text',
      success_title: 'success title text',
      success_message: 'success message text',
      value_prefix: 'value prefix',
      waiting: 'waiting text string',
    },
  };

  it('renders without crashing', () => {
    const component = mount(<AddressInputComponent {...initProps} />);
    expect(component).toMatchSnapshot();
  });

  it('opens edit area when edit button is clicked and matches snapshot', () => {
    const component = mount(<AddressInputComponent {...initProps} />);
    component.find('button.edit').simulate('click');
    expect(component.find('div.edit').length).toBe(1);
    expect(component).toMatchSnapshot();
  });

  it('closes the edit area when button or cancel is clicked', () => {
    const component = mount(<AddressInputComponent {...initProps} />);
    component.find('button.edit').simulate('click');
    expect(component.find('div.edit').length).toBe(1);

    // click cancel button:
    component.find('button.cancel').simulate('click');
    expect(component.find('div.edit').length).toBe(0);

    // double click edit button:
    component.find('button.edit').simulate('click').simulate('click');
    expect(component.find('div.edit').length).toBe(0);

    // click the delete button:
    component.find('button.delete').simulate('click');
    expect(component.find('div.edit').length).toBe(0);
  });

  it('shows confirmation window when delete is clicked', () => {
    const component = mount(<AddressInputComponent {...initProps} />);
    component.find('button.delete').simulate('click');
    expect(component.find('div.delete').length).toBe(1);
    expect(component).toMatchSnapshot();
  });

  it('closes delete window when cancel or button is clicked', () => {
    const component = mount(<AddressInputComponent {...initProps} />);
    component.find('button.delete').simulate('click');
    expect(component.find('div.delete').length).toBe(1);

    // click cancel button:
    component.find('button.cancel').simulate('click');
    expect(component.find('div.delete').length).toBe(0);

    // double click cancel button:
    component.find('button.delete').simulate('click').simulate('click');
    expect(component.find('div.delete').length).toBe(0);

    // click edit button:
    component.find('button.edit').simulate('click');
    expect(component.find('div.delete').length).toBe(0);
  });

  it('handles delete function when clicked', () => {
    const component = mount(<AddressInputComponent {...initProps} />);
    component.find('button.delete').simulate('click');
    component.find('button.submit').simulate('click');
    expect(initProps.handleDelete).toBeCalledTimes(1);
  });

  it('delete is not shown when allowDelete is false', () => {
    const localProps = {
      ...initProps,
      allowDelete: false,
    };
    const component = mount(<AddressInputComponent {...localProps} />);
    expect(component.find('button.delete').length).toBe(0);
  });

  it('handles submit function when clicked', () => {
    const localProps = {
      ...initProps,
      value: 'jesse.rsk',
    };

    const component = mount(<AddressInputComponent {...localProps} />);
    component.find('button.edit').simulate('click');
    component.find('button.submit').simulate('click');
    expect(initProps.handleSubmit).toBeCalledTimes(1);
    expect(initProps.handleSubmit).toBeCalledWith('jesse.rsk');
  });

  it('shows waiting div when waiting', () => {
    const localProps = {
      ...initProps,
      isWaiting: true,
    };

    const component = mount(<AddressInputComponent {...localProps} />);
    expect(component.find('div.waiting').length).toBe(1);

    expect(component).toMatchSnapshot();
  });

  it('shows success and handleSuccessClose is called when clicked', () => {
    const localProps = {
      ...initProps,
      onSuccess: true,
    };

    const component = mount(<AddressInputComponent {...localProps} />);
    expect(component.find('div.success').length).toBe(1);

    component.find('div.success').find('button.close').simulate('click');
    expect(initProps.handleSuccessClose).toBeCalledTimes(1);
  });

  it('error is showsn when isError is true', () => {
    const localProps = {
      ...initProps,
      isError: true,
    };

    const component = mount(<AddressInputComponent {...localProps} />);
    expect(component.find('div.error').length).toBe(1);

    component.find('div.error').find('button.close').simulate('click');
    expect(initProps.handleErrorClose).toBeCalledTimes(1);
  });

  it('start, edit, and delete allow custom text ', () => {
    const localProps = {
      ...initProps,
      strings: {
        cancel: 'custom cancel string',
        delete: 'custom delete string',
        delete_confirm_text: 'custom delete confirm text',
        edit: 'custom edit text',
        edit_placeholder: 'custom placeholder text',
        edit_propmt: 'custom edit prompt text',
        submit: 'custom submit text',
        value_prefix: 'custom value prefix',
      },
    };
    const component = mount(<AddressInputComponent {...localProps} />);
    expect(component.find('div.value').text()).toEqual('custom value prefix: Value');

    // edit screen
    component.find('button.edit').simulate('click');
    expect(component.find('div.editLabel').text()).toEqual('custom edit prompt text');
    expect(component.find('button.cancel').text()).toEqual('custom cancel string');
    expect(component.find('button.submit').text()).toEqual('custom submit text');

    // delete screen
    component.find('button.delete').simulate('click');
    expect(component.find('div.delete').find('p').first().text())
      .toEqual('custom delete confirm text');
    expect(component.find('button.cancel').text()).toBe('custom cancel string');
    expect(component.find('button.submit').text()).toBe('custom delete string');
  });

  it('waiting allows cutom text', () => {
    const localProps = {
      ...initProps,
      isWaiting: true,
      strings: {
        waiting: 'custom waiting text string',
      },
    };
    const component = mount(<AddressInputComponent {...localProps} />);
    expect(component.find('div.waiting').text()).toBe('custom waiting text string');
  });

  it('error allows cutom text', () => {
    const localProps = {
      ...initProps,
      isError: true,
      strings: {
        error_title: 'custom error title text',
        error_message: 'custom error message text',
      },
    };
    const component = mount(<AddressInputComponent {...localProps} />);
    expect(component.find('p').at(0).text()).toBe('custom error title text');
    expect(component.find('p').at(1).text()).toBe('custom error message text');
  });

  it('success allows cutom text', () => {
    const localProps = {
      ...initProps,
      onSuccess: true,
      strings: {
        success_title: 'custom success title text',
        success_message: 'custom success message text',
      },
    };
    const component = mount(<AddressInputComponent {...localProps} />);
    expect(component.find('p').at(0).text()).toBe('custom success title text');
    expect(component.find('p').at(1).text()).toBe('custom success message text');
  });
});
