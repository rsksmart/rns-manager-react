import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { AddrContainer, ContentContainer } from './containers';
import { AuthTabWrapper } from '../../auth'

import reducer from './reducer';
export default reducer;

class PublicResolverTab extends Component {
  render () {
    return (
      <AuthTabWrapper>
        <Container>
          <Row>
            <Col>
              <h2>Manage resolution</h2>
            </Col>
          </Row>
          <Row>
            <Col>
              <AddrContainer name='Address' />
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <ContentContainer name='Content' />
            </Col>
          </Row>
        </Container>
      </AuthTabWrapper>
    )
  }
}

export { PublicResolverTab }
