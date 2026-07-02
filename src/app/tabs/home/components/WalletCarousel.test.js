import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { mockStoreEnglish } from '../../../../../tests/config/mockStore';
import WalletCarousel from './WalletCarousel';

describe('WalletCarousel', () => {
  const wallet = i => ({ name: `name${i}`, image: `image${i}.jpg`, link: `url${i}` });
  const wallets2 = [wallet(1), wallet(2)];
  const wallets7 = [wallet(1), wallet(2), wallet(3), wallet(4), wallet(5), wallet(6), wallet(7)];

  const store = mockStoreEnglish();
  const generateComponent = wallets => (
    <Provider store={store}><WalletCarousel wallets={wallets} /></Provider>
  );

  describe('basic', () => {
    it('renders', () => {
      const { container } = render(generateComponent(wallets2));
      expect(container).toBeDefined();
    });

    it('has header', () => {
      const { container } = render(generateComponent(wallets2));
      expect(container.querySelector('h2').textContent).toBe('Wallet and dapp integrations');
    });
  });

  describe('content', () => {
    it('displays the correct content for first item', () => {
      const { container } = render(generateComponent(wallets2));

      const first = container.querySelectorAll('.carousel-item')[0].querySelectorAll('.col')[0];

      expect(first.querySelector('p').textContent).toBe('name1');
      expect(first.querySelector('a').getAttribute('href')).toBe('url1');
      expect(first.querySelector('.image-container').style.backgroundImage).toBe('url("image1.jpg")');
    });

    it('displays name of sixth item', () => {
      const { container } = render(generateComponent(wallets7));
      const column = container.querySelectorAll('.carousel-item')[1].querySelectorAll('.col')[2];
      expect(column.querySelector('p').textContent).toBe('name6');
    });
  });

  describe('number of items', () => {
    it('creates 3 pages', () => {
      const { container } = render(generateComponent(wallets7));
      expect(container.querySelectorAll('.carousel-item')).toHaveLength(3);
    });

    it('creates 1 page', () => {
      const { container } = render(generateComponent(wallets2));
      expect(container.querySelectorAll('.carousel-item')).toHaveLength(1);
    });
  });
});
