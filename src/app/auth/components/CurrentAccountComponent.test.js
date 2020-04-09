import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import CurrentAccountComponent from './CurrentAccountComponent';
import mockStore from '../../../../tests/config/mockStore';
import en from '../../../languages/en.json';

const store = mockStore({
  log_out: en.log_out,
});

describe('CurrentAccountComponent', () => {
  it('renders and matches snapshot', () => {
    const handleLogOut = jest.fn();
    const switchLoginClick = jest.fn();

    const component = mount(
      <Provider store={store}>
        <HashRouter>
          <CurrentAccountComponent
            name="foobar.rsk"
            handleLogOut={handleLogOut}
            switchLoginClick={switchLoginClick}
          />
        </HashRouter>
      </Provider>,
    );

    expect(component).toMatchSnapshot();

    expect(component.find('a').text()).toBe('foobar.rsk');
    expect(component.find('button').text()).toBe(en.log_out);
  });
});
