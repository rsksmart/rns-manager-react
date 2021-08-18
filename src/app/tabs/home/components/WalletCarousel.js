import React, { useState } from 'react';
import { multilanguage } from 'redux-multilanguage';
import propTypes from 'prop-types';
import { Carousel, Row, Col } from 'react-bootstrap';

const WalletCarousel = ({ wallets, strings }) => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  /**
   * Group the wallets into 3s:
   */
  const walletsByThree = [];
  wallets.forEach((wallet, i) => {
    if (i % 3 === 0) {
      // new set
      walletsByThree[Math.floor(i / 3)] = [wallet];
    } else {
      walletsByThree[Math.floor(i / 3)].push(wallet);
    }
  });

  const SingleItem = (item) => {
    const { name, link, image } = item;
    return (
      <Col key={name}>
        <a href={link} target="_blank" rel="noopener noreferrer">
          <div className="image-container" style={{ backgroundImage: `url(${image})` }} />
          <p>{name}</p>
        </a>
      </Col>
    );
  };

  return (
    <div className="supported-wallets">
      <h2>{strings.rns_integrations}</h2>
      <Carousel activeIndex={index} onSelect={handleSelect} controls className="wallet-carousel">
        {walletsByThree.map(walletGroup => (
          <Carousel.Item key={walletGroup[0].name}>
            <Row>
              {walletGroup.map(wallet => SingleItem(wallet))}
            </Row>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

WalletCarousel.propTypes = {
  wallets: propTypes.arrayOf(propTypes.shape({
    name: propTypes.string.isRequired,
    link: propTypes.string.isRequired,
    image: propTypes.string.isRequired,
  })).isRequired,
  strings: propTypes.shape({
    rns_integrations: propTypes.string.isRequired,
  }).isRequired,
};

export default multilanguage(WalletCarousel);
