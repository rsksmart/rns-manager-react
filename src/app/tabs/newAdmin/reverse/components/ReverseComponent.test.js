import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import mockStore from '../../../../../../tests/config/mockStore';
import en from '../../../../../languages/en.json';

import ReverseComponent from './ReverseComponent';

const store = mockStore({
  reverse: en.reverse,
});

const component = mount(<Provider store={store}><ReverseComponent /></Provider>);

describe('ReverseComponent', () => {
  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
