import React from 'react';
import { HashRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import mockStore from '../../../../../tests/config/mockStore';
import en from '../../../../languages/en.json';

import LeftNavComponent from './LetftNavComponent';

const store = mockStore(en); // @TODO: use new mockStoreEnglish when it is merged!

describe('LeftNavComponent', () => {
  it('matches snapshot', () => {
    const component = mount(
      <Provider store={store}>
        <HashRouter>
          <LeftNavComponent location="/newAdmin" advancedView={false} domain="foobar.rsk" />
        </HashRouter>
      </Provider>,
    );
    expect(component).toBeDefined();
  });

  it('shows all items when advancedView is true', () => {
    const component = mount(
      <Provider store={store}>
        <HashRouter>
          <LeftNavComponent location="/newAdmin/subdomains" advancedView domain="foobar.rsk" />
        </HashRouter>
      </Provider>,
    );
    expect(component.find('li').length).toBe(5);
  });

  it('sets correct item active when passed', () => {
    const component = mount(
      <Provider store={store}>
        <HashRouter>
          <LeftNavComponent location="/newAdmin/subdomains" advancedView={false} domain="foobar.rsk" />
        </HashRouter>
      </Provider>,
    );

    expect(component.find('a.active').text()).toEqual('subdomains');
    expect(component.find('li').length).toBe(3);
  });

  it('sets home as active when resolver is passed, but advancedView is false.', () => {
    const component = mount(
      <Provider store={store}>
        <HashRouter>
          <LeftNavComponent location="/newAdmin/resolver" advancedView={false} domain="foobar.rsk" />
        </HashRouter>
      </Provider>,
    );

    expect(component.find('a.active').text()).toEqual('Domain info');
  });
});
