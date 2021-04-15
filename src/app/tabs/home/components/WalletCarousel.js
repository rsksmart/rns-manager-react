import React, { useState } from 'react';
import { Carousel, Row, Col } from 'react-bootstrap';
import wallets from '../wallets.json';

const WalletCarousel = () => {
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

  const SingleItem = item => (
    <Col>
      <a href={item.link} target="_blank" rel="noopener noreferrer">
        <div className="image-container" style={{ backgroundImage: `url(${item.image})` }} />
        <p>{item.name}</p>
      </a>
    </Col>
  );

  return (
    <div className="supported-wallets">
      <h2>Supported Wallets</h2>
      <Carousel activeIndex={index} onSelect={handleSelect} controls className="wallet-carousel">
        {walletsByThree.map(walletGroup => (
          <Carousel.Item>
            <Row>
              {walletGroup.map(wallet => SingleItem(wallet))}
            </Row>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default WalletCarousel;
