import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { StartButton } from '..';
import { multilanguage } from 'redux-multilanguage';

class AuthTabComponent extends Component {
  render () {
    const { strings, isLoggedIn } = this.props;

    if (!isLoggedIn) return (
      <Container>
        <Row>
          <Col>
            <p>{strings.please_log_in}</p>
            <StartButton />
          </Col>
        </Row>
      </Container>
    );

    return this.props.children;
  }
}

export default multilanguage(AuthTabComponent);
