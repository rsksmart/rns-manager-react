import React from 'react';
import { shallow } from 'enzyme';

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
    const component = shallow(<AddressInputComponent {...initProps} />);
    expect(component).toMatchSnapshot();
  });

  it('shows confirmation window when delete is clicked', () => {
    const component = shallow(<AddressInputComponent {...initProps} />);
    component.find('button.delete').simulate('click');
    expect(component.find('div.delete').length).toBe(1);
    expect(component).toMatchSnapshot();
  });

  it('delete is not shown when allowDelete is false', () => {
    const localProps = {
      ...initProps,
      allowDelete: false,
    };
    const component = shallow(<AddressInputComponent {...localProps} />);
    expect(component.find('button.delete').length).toBe(0);
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
    const component = shallow(<AddressInputComponent {...localProps} />);
    expect(component.find('div.value').text()).toEqual('custom value prefix: Value');

    // edit screen
    component.find('button.edit').simulate('click');
    expect(component.find('div.editLabel').text()).toEqual('custom edit prompt text');

    // delete screen
    component.find('button.delete').simulate('click');
    expect(component.find('div.delete').find('p').first().text())
      .toEqual('custom delete confirm text');
  });
});
