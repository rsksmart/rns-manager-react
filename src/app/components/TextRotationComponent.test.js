import React from 'react';
import { render } from '@testing-library/react';
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
    const { container } = render(<TextRotationComponent {...initProps} />);

    expect(container.querySelector('h3').textContent).toBe('the heading...');
    // test just the <strong> part, ignore the anchor
    expect(container.querySelector('p').outerHTML.substr(0, 32)).toBe('<p>hello <strong>world</strong>.');
    // now test the anchor
    expect(container.querySelector('a').textContent).toBe('click');
    expect(container.querySelector('a').getAttribute('href')).toBe('https://developers.rsk.co/');

    expect(container).toMatchSnapshot();
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

    const { container } = render(<TextRotationComponent {...localProps} />);
    expect(container.querySelector('p').outerHTML.substr(0, 50)).toBe('<p>hello, <strong> this is a giant</strong> world.');
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

    const { container } = render(<TextRotationComponent {...localProps} />);
    expect(container.querySelector('p').outerHTML).toBe('<p>text with no link or bold</p>');
    expect(container.querySelectorAll('a').length).toBe(0);
  });
});
