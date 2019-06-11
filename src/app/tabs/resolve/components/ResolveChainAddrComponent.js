import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { multilanguage } from 'redux-multilanguage';
import ResolutionComponent from './ResolutionComponent';
import { ChainAddrSelectorComponent } from '../../../components';

class ResolveChainAddr extends Component {
  render () {
    const { strings, loading, error, value, getChainAddr } = this.props;

    return (
      <Container>
        <Row>
          <Col>
            <h2>{strings.chain_address}</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <ChainAddrSelectorComponent list='chains' onChange={e => {
              if (e.target.value && e.target.value.length === 10) {
                getChainAddr(e.target.value);
              }
            }} />
          </Col>
        </Row>
        <Row>
          <Col>
            <ResolutionComponent error={error} loading={loading} value={value} />
          </Col>
        </Row>
    </Container>
    );
  }
};

export default multilanguage(ResolveChainAddr);
