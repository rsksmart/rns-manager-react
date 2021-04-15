import React from 'react';
import { mount } from 'enzyme';
import WalletCarousel from './WalletCarousel';
// import startingWallets from '../wallets.json';

describe('WalletCarousel', () => {
  const wallet = i => ({ name: `name${i}`, image: `image${i}.jpg`, link: `url${i}` });
  const wallets2 = [wallet(1), wallet(2)];
  const wallets7 = [wallet(1), wallet(2), wallet(3), wallet(4), wallet(5), wallet(6), wallet(7)];

  it('renders', () => {
    const component = mount(<WalletCarousel wallets={wallets2} />);
    expect(component).toBeDefined();
  });

  describe('content', () => {
    it('displays the correct content for first item', () => {
      const component = mount(<WalletCarousel wallets={wallets2} />);

      const first = component.find('.carousel-item').find('.col').at(0);

      expect(first.find('p').text()).toBe('name1');
      expect(first.find('a').props().href).toBe('url1');
      expect(first.find('.image-container').props().style).toMatchObject({ backgroundImage: 'url(image1.jpg)' });
    });

    it('displays name of sixth item', () => {
      const component = mount(<WalletCarousel wallets={wallets7} />);
      const column = component.find('.carousel-item').at(1).find('.col').at(2);
      expect(column.find('p').text()).toBe('name6');
    });
  });

  describe('number of items', () => {
    it('creates 3 pages', () => {
      const component = mount(<WalletCarousel wallets={wallets7} />);
      expect(component.find('.carousel-item')).toHaveLength(3);
    });

    it('creates 1 page', () => {
      const component = mount(<WalletCarousel wallets={wallets2} />);
      expect(component.find('.carousel-item')).toHaveLength(1);
    });
  });
});
