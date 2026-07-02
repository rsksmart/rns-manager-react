import React from 'react';
import { fireEvent } from '@testing-library/react';
import mockStore from '../../../../../../tests/config/mockStore';
import { renderWithProviders } from '../../../../../../tests/testUtils';
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
    const { container } = renderWithProviders(<ShareButtonComponent domain="foobar.rsk" />, { store });
    fireEvent.click(container.querySelector('button.share-button'));
  });

  it('opens link window when clicked', () => {
    const { container } = renderWithProviders(<ShareButtonComponent domain="foobar.rsk" />, { store });

    // The share-button trigger is inside `container`, but react-bootstrap's
    // OverlayTrigger/Popover content it reveals is portaled to document.body.
    fireEvent.click(container.querySelector('button.share-button'));
    fireEvent.click(document.querySelector('.link.btn-link'));

    expect(document.querySelectorAll('.row.share-link input')[0].value)
      .toBe('/resolve?name=foobar.rsk');
  });
});
