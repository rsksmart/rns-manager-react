import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import mockStore from '../../../../../../tests/config/mockStore';
import en from '../../../../../languages/en.json';

import AddressesComponent from './AddressesComponent';

const store = mockStore({
  your_addresses: en.your_addresses,
});

const component = mount(<Provider store={store}><AddressesComponent /></Provider>);

describe('AddressesComponent', () => {
  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
