import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { StartButton } from '..';

class AuthTabComponent extends Component {
  render () {
    const { isLoggedIn } = this.props;

    if (!isLoggedIn) return (
      <Container>
        <Row>
          <Col>
            <p>Please log in.</p>
            <StartButton />
          </Col>
        </Row>
      </Container>
    );

    return this.props.children;
  }
}

export default AuthTabComponent;
