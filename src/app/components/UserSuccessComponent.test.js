import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import UserSuccessComponent from './UserSuccessComponent';
import mockStore from '../../../tests/config/mockStore';
import en from '../../languages/en.json';

const store = mockStore({
  close: en.close,
});

describe('UserSuccessComponent', () => {
  it('renders and matches snapshot', () => {
    const component = mount(<Provider store={store}><UserSuccessComponent /></Provider>);
    expect(component).toMatchSnapshot();
  });

  it('renders correct title and message text', () => {
    const component = mount(
      <Provider store={store}>
        <UserSuccessComponent title="Test Title" message="Test Message!" />
      </Provider>,
    );

    expect(component.find('strong').text()).toEqual('Test Title');
    expect(component.find('p').at(1).text()).toEqual('Test Message!');
  });
});
