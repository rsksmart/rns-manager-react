import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';
import { multilanguage } from 'redux-multilanguage';
import ResolutionComponent from './ResolutionComponent';

class ResolveAddr extends Component {
  componentDidMount() {
    const { getResolution } = this.props;
    getResolution();
  }

  render() {
    const {
      strings, loading, error, value, title,
    } = this.props;

    return (
      <Container>
        <Row>
          <Col>
            <h2 style={{ textAlign: 'center' }}>
              {(title === 'RSK') ? strings.rsk_address : strings.reverse}
            </h2>
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
  getResolution: propTypes.func.isRequired,
  strings: propTypes.shape({
    rsk_address: propTypes.string.isRequired,
    reverse: propTypes.string.isRequired,
  }).isRequired,
  loading: propTypes.bool.isRequired,
  error: propTypes.string,
  value: propTypes.string,
  title: propTypes.string.isRequired,
};

ResolveAddr.defaultProps = {
  error: null,
  value: null,
};

export default multilanguage(ResolveAddr);
