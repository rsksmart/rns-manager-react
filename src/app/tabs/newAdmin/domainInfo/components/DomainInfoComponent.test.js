import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import mockStore from '../../../../../tests/config/mockStore';
import en from '../../../../languages/en.json';

import DomainInfoComponent from './DomainInfoComponent';

const store = mockStore({
  domain_info: en.domain_info,
  copy_text: en.copy_text,
  copied: en.copied,
  transfer: en.transfer,
  transfer_warning: en.transfer_warning,
});

const component = mount(<Provider store={store}><DomainInfoComponent domain="jesse.rsk" /></Provider>);

describe('DomainInfoComponent', () => {
  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
