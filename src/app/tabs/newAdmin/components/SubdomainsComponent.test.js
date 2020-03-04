import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import mockStore from '../../../../../tests/config/mockStore';
import en from '../../../../languages/en.json';

import SubdomainsComponent from './SubdomainsComponent';

const store = mockStore({
  subdomains: en.subdomains,
});

const component = mount(<Provider store={store}><SubdomainsComponent /></Provider>);

describe('DomainInfoComponent', () => {
  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
