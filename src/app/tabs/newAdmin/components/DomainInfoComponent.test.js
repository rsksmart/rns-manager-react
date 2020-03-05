import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import mockStore from '../../../../../tests/config/mockStore';
import en from '../../../../languages/en.json';

import DomainInfoComponent from './DomainInfoComponent';

const store = mockStore({
  domain_info: en.domain_info,
});

const component = mount(<Provider store={store}><DomainInfoComponent /></Provider>);

describe('DomainInfoComponent', () => {
  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
