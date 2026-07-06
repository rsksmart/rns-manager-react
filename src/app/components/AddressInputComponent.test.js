import React from 'react';
import { Provider } from 'react-redux';
import { render, fireEvent } from '@testing-library/react';

import AddressInputComponent from './AddressInputComponent';
import { mockStoreEnglish } from '../../../tests/config/mockStore';

const store = mockStoreEnglish();

const renderComponent = props => render(
  <Provider store={store}><AddressInputComponent {...props} /></Provider>,
);

describe('AddressInputComponent', () => {
  const initProps = {
    allowDelete: true,
    label: 'Label',
    value: 'Value',
    handleErrorClose: jest.fn(),
    handleSuccessClose: jest.fn(),
    handleSubmit: jest.fn(),
    handleDelete: jest.fn(),
    validation: false,
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
      suggestion: 'suggestion',
    },
  };

  const checksumInitialProps = {
    ...initProps,
    validation: true,
    strings: {
      ...initProps.strings,
      value_prefix: '',
    },
  };

  it('renders without crashing', () => {
    const { container } = renderComponent(initProps);
    expect(container.querySelector('div.addressInput')).toBeInTheDocument();
  });

  it('shows confirmation window when delete is clicked', () => {
    const { container } = renderComponent(initProps);
    fireEvent.click(container.querySelector('button.delete'));
    expect(container.querySelectorAll('div.delete').length).toBe(1);
  });

  it('delete is not shown when allowDelete is false', () => {
    const localProps = {
      ...initProps,
      allowDelete: false,
    };
    const { container } = renderComponent(localProps);
    expect(container.querySelectorAll('button.delete').length).toBe(0);
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
    const { container } = renderComponent(localProps);
    expect(container.querySelector('div.value').textContent).toEqual('custom value prefix: Value');

    // edit screen
    fireEvent.click(container.querySelector('button.edit'));
    expect(container.querySelector('div.editLabel').textContent).toEqual('custom edit prompt text');

    // delete screen
    fireEvent.click(container.querySelector('button.delete'));
    expect(container.querySelector('div.delete p').textContent)
      .toEqual('custom delete confirm text');
  });

  it('dispalys an icon correctly', () => {
    const localProps = {
      ...initProps,
      label: 'rsk',
      labelIcon: '/assets/icons/icon_rsk.png',
    };
    const { container } = renderComponent(localProps);
    const image = container.querySelector('div.label img');
    expect(image.getAttribute('src')).toEqual('/assets/icons/icon_rsk.png');
    expect(image.getAttribute('alt')).toEqual('rsk');
  });

  it('displays correct checksum for ethereum', () => {
    const ethereumChecksum = '0xEe3D5f22Ea0FF393AeEf5Cf88a81E7d44979633B';

    const localProps = {
      ...checksumInitialProps,
      value: '0xee3d5f22ea0ff393aeef5cf88a81e7d44979633b',
    };

    const { container } = renderComponent(localProps);
    expect(container.querySelector('div.value').textContent).toBe(ethereumChecksum);
  });

  it('displays correct checksum for RSK testnet', () => {
    const rskTestnetChecksum = '0xEE3D5f22Ea0Ff393aeeF5cf88a81E7D44979633B';

    const localProps = {
      ...checksumInitialProps,
      value: '0xee3d5f22ea0ff393aeef5cf88a81e7d44979633b',
      validationChainId: '31',
    };

    const { container } = renderComponent(localProps);
    expect(container.querySelector('div.value').textContent).toBe(rskTestnetChecksum);
  });

  it('displays correct checksum for RSK mainnet', () => {
    const rskMainnetChecksum = '0x5215d879F378c902E6CC0CB9ace0240Ac7a863E7';

    const localProps = {
      ...checksumInitialProps,
      value: '0x5215d879f378c902e6cc0cb9ace0240ac7a863e7',
      validationChainId: '30',
    };

    const { container } = renderComponent(localProps);
    expect(container.querySelector('div.value').textContent).toBe(rskMainnetChecksum);
  });

  it('renders when validation but no value', () => {
    const localProps = {
      ...checksumInitialProps,
      value: '',
      validationChainId: '30',
    };

    const { container } = renderComponent(localProps);
    expect(container.querySelector('div.value').textContent).toBe('');
  });

  it('does not show suggested row when there are no suggestions', () => {
    const localProps = {
      ...checksumInitialProps,
      value: '',
    };

    const { container } = renderComponent(localProps);
    fireEvent.click(container.querySelector('button.edit'));

    expect(container.querySelectorAll('ul.suggestions').length).toBe(0);
  });

  it('displays suggested items', () => {
    const localProps = {
      ...checksumInitialProps,
      value: '',
      validationChainId: '30',
      suggestions: [
        {
          name: 'suggested item',
          value: '0x123456789',
        },
        {
          name: 'suggested item 2',
          value: '0x987654321',
        },
      ],
    };

    const { container } = renderComponent(localProps);
    fireEvent.click(container.querySelector('button.edit'));

    const ul = container.querySelector('ul.suggestions');
    expect(ul.children.length).toBe(3);
    expect(ul.querySelector('li.title').textContent).toBe('suggestion:');
    expect(ul.querySelectorAll('li')[1].textContent).toBe('suggested item');
    expect(ul.querySelectorAll('li')[2].textContent).toBe('suggested item 2');
  });

  it('does not display suggested items when item is the value', () => {
    const localProps = {
      ...checksumInitialProps,
      value: '0x123456789',
      suggestions: [
        {
          name: 'suggested item',
          value: '0x123456789',
        },
        {
          name: 'suggested item 2',
          value: '0x987654321',
        },
      ],
    };

    const { container } = renderComponent(localProps);
    fireEvent.click(container.querySelector('button.edit'));

    const ul = container.querySelector('ul.suggestions');
    expect(ul.children.length).toBe(2);
    expect(ul.querySelector('li.title').textContent).toBe('suggestion:');
    expect(ul.querySelectorAll('li')[1].textContent).toBe('suggested item 2');
  });

  it('hids and shows the settings menu', () => {
    const localProps = {
      ...initProps,
      settingsMenu: <div>settings</div>,
    };
    const { container } = renderComponent(localProps);
    fireEvent.click(container.querySelector('button.settings'));
    expect(container.querySelector('.settingsMenu')).toBeInTheDocument();
  });
});
