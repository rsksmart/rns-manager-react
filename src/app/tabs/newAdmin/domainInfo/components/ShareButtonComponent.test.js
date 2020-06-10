import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import mockStore from '../../../../../../tests/config/mockStore';
import en from '../../../../../languages/en.json';

import ShareButtonComponent from './ShareButtonComponent';

const store = mockStore({
  share_your_domain: en.share_your_domain,
  my_rsk_domain: en.my_rsk_domain,
  email: en.email,
  whatsapp: en.whatsapp,
  link: en.link,
  copy_text: en.copy_text,
  copied: en.copied,
});


describe('RenewButtonComponent', () => {
  it('renders without crashing', () => {
    const component = mount(
      <Provider store={store}>
        <ShareButtonComponent domain="foobar.rsk" />
      </Provider>,
    );

    component.find('button.share-button').simulate('click');
    expect(component).toMatchSnapshot();
  });

  it('opens link window when clicked', () => {
    const component = mount(
      <Provider store={store}>
        <ShareButtonComponent domain="foobar.rsk" />
      </Provider>,
    );

    component.find('button.share-button').at(0).simulate('click');
    component.find('.link.btn-link').simulate('click');

    expect(component.find('.row.share-link input').at(0).props().defaultValue)
      .toBe('/resolve?name=foobar.rsk');
  });
});
