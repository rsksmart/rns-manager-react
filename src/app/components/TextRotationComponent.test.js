import React from 'react';
import { mount } from 'enzyme';
import TextRotationComponent from './TextRotationComponent';
import KeyMessages from '../../languages/key_messges.json';

describe('TextRotationComponent', () => {
  const initProps = {
    language: 'en',
    heading: 'the heading',
    timer: 10000,
    messages: [
      {
        ...KeyMessages[0],
        en: {
          content: 'hello $world$.',
          link_label: 'click',
        },
      },
    ],
  };

  it('renders, places correct content with bold and matches snapshot', () => {
    const component = mount(<TextRotationComponent {...initProps} />);

    expect(component.find('h3').text()).toBe('the heading...');
    expect(component.find('p').at(0).html()).toBe('<p>hello <strong>world</strong>.</p>');
    expect(component.find('a').text()).toBe('click');

    expect(component).toMatchSnapshot();
  });
});
