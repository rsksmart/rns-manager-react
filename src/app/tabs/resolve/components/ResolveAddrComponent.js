import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';
import { multilanguage } from 'redux-multilanguage';
import ResolutionComponent from './ResolutionComponent';

class ResolveAddr extends Component {
  componentDidMount() {
    const { getAddr } = this.props;
    getAddr();
  }

  render() {
    const {
      strings, loading, error, value,
    } = this.props;

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
}

ResolveAddr.propTypes = {
  getAddr: propTypes.func.isRequired,
  strings: propTypes.shape({
    rsk_address: propTypes.string.isRequired,
  }).isRequired,
  loading: propTypes.bool.isRequired,
  error: propTypes.string.isRequired,
  value: propTypes.string.isRequired,
};

export default multilanguage(ResolveAddr);
