import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';
import { multilanguage } from 'redux-multilanguage';
import ResolutionComponent from './ResolutionComponent';

class ResolveName extends Component {
  componentDidMount() {
    const { getName } = this.props;
    getName();
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

ResolveName.propTypes = {
  getName: propTypes.func.isRequired,
  strings: propTypes.shape({
    rsk_address: propTypes.string.isRequired,
  }).isRequired,
  loading: propTypes.bool.isRequired,
  error: propTypes.string,
  value: propTypes.string,
};

ResolveName.defaultProps = {
  error: null,
  value: null,
};

export default multilanguage(ResolveName);
