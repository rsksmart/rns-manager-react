import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

class PublicResolverFieldComponent extends Component {
  componentDidMount () {
    const { domain, getValue } = this.props;
    getValue(domain);
  }
  render () {
    const { name, getting, value, error } = this.props;

    return (
      <Row>
        <Col md={2}>{name}</Col>
        <Col md={8}>{getting ? '...' : (value || error)}</Col>
      </Row>
    );
  }
};

export default PublicResolverFieldComponent;
