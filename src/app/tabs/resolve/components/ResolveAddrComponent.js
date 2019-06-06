import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { multilanguage } from 'redux-multilanguage';
import ResolutionComponent from './ResolutionComponent';

class ResolveAddr extends Component {
  componentDidMount () {
    const { getAddr } = this.props;
    getAddr();
  }

  render () {
    const { strings, loading, error, value } = this.props;

    return (
      <Container>
        <Row>
          <Col>
            <h2>{strings.rsk_address}</h2>
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

export default multilanguage(ResolveAddr);
