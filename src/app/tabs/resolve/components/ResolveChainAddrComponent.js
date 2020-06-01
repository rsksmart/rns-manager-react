import React, { useState } from 'react';
import propTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';
import { multilanguage } from 'redux-multilanguage';
import ResolutionComponent from './ResolutionComponent';
import networks from '../../newAdmin/addresses/networks.json';

const ResolveChainAddr = ({
  strings, loading, error, value, getChainAddr, hasMulticoin,
}) => {
  const [selectedChain, setSelectedChain] = useState('');
  const handleChange = (e) => {
    setSelectedChain(e.target.value);
    if (e.target.value && e.target.value.length === 10) {
      getChainAddr(e.target.value);
    }
  };

  const coinList = () => {
    const coins = hasMulticoin ? networks : networks.filter(address => address.multi === true);
    return coins.map(address => (
      <option value={address.id}>{address.name}</option>
    ));
  };

  return (
    <Container>
      <Row>
        <Col>
          <h3>{strings.chain_address}</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <select
            className="selectChain break-below"
            onChange={handleChange}
            value={selectedChain}
          >
            <option value="">Select Coin...</option>
            {coinList()}
          </select>
        </Col>
      </Row>
      {selectedChain !== '' && (
      <Row>
        <Col>
          <ResolutionComponent
            error={error}
            loading={loading}
            value={value}
          />
        </Col>
      </Row>
      )}
    </Container>
  );
};

ResolveChainAddr.propTypes = {
  strings: propTypes.shape({
    chain_address: propTypes.string.isRequired,
  }).isRequired,
  loading: propTypes.bool.isRequired,
  error: propTypes.string,
  value: propTypes.string,
  getChainAddr: propTypes.func.isRequired,
  hasMulticoin: propTypes.bool.isRequired,
};

ResolveChainAddr.defaultProps = {
  error: null,
  value: null,
};

export default multilanguage(ResolveChainAddr);
