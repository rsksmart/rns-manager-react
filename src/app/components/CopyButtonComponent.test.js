import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

import CopyButtonComponent from './CopyButtonComponent';
import mockStore from '../../../tests/config/mockStore';
import en from '../../languages/en.json';

const store = mockStore({
  copy_text: en.copy_text,
  copied: en.copied,
});

describe('CopyButtonComponent', () => {
  it('matches snapshot', () => {
    const { container } = render(
      <Provider store={store}><CopyButtonComponent text="hello" /></Provider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('matches the correct text', () => {
    const { container } = render(
      <Provider store={store}><CopyButtonComponent text="hello" /></Provider>,
    );
    expect(container.querySelector('.copyText').value).toEqual('hello');
  });
});
