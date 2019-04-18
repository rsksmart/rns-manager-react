import React, { Component } from 'react'
import { Container, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { OwnerContainer, ResolverContainer, TtlContainer, SubdomainsListContainer } from './containers';
import { AuthTabWrapper } from '../../auth'

import reducer from './reducer';
export default reducer;

class AdminTab extends Component {
  render () {
    return (
      <AuthTabWrapper>
        <Container>
          <h2>admin your name</h2>
          <Row>
            <Col>
              <OwnerContainer />
            </Col>
          </Row>
          <hr />
          <Row>
            <Col>
              <ResolverContainer />
            </Col>
          </Row>
          <Row>
            <Col>
              <Link to='/publicResolver'>Admin resolution</Link>
            </Col>
          </Row>
          <hr />
          <Row>
            <Col>
              <TtlContainer />
            </Col>
          </Row>
          <hr />
          <Row>
            <Col>
              <h3>subdomains</h3>
              <SubdomainsListContainer />
            </Col>
          </Row>
        </Container>
      </AuthTabWrapper>
    );
  }
}

export { AdminTab };
