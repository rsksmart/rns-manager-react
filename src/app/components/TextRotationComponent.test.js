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
        link: 'https://developers.rsk.co/',
      },
    ],
  };

  it('renders, places correct content with bold and matches snapshot', () => {
    const component = mount(<TextRotationComponent {...initProps} />);

    expect(component.find('h3').text()).toBe('the heading...');
    // test just the <strong> part, ignore the anchor
    expect(component.find('p').at(0).html().substr(0, 32)).toBe('<p>hello <strong>world</strong>.');
    // now test the anchor
    expect(component.find('a').text()).toBe('click');
    expect(component.find('a').props().href).toBe('https://developers.rsk.co/');

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
    expect(component.find('p').at(0).html().substr(0, 50)).toBe('<p>hello, <strong> this is a giant</strong> world.');
  });

  it('renders full text and does not show link', () => {
    const localProps = {
      language: 'en',
      heading: 'the heading',
      timer: 10000,
      messages: [
        {
          en: {
            content: 'text with no link or bold',
            link_label: '',
          },
          link: '',
        },
      ],
    };

    const component = mount(<TextRotationComponent {...localProps} />);
    expect(component.find('p').html()).toBe('<p>text with no link or bold</p>');
    expect(component.find('a').length).toBe(0);
  });
});
