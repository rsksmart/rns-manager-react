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

    expect(component).toMatchSnapshot();
  });

  it('renders different strong text', () => {
    const localProps = {
      language: 'en',
      heading: 'the heading',
      timer: 10000,
      messages: [
        {
          ...KeyMessages[0],
          en: {
            content: 'hello, $ this is a giant$ world.',
            link_label: 'click',
          },
        },
      ],
    };

    const component = mount(<TextRotationComponent {...localProps} />);
    expect(component.find('p').at(0).html()).toBe('<p>hello, <strong> this is a giant</strong> world.</p>');
  });
});
