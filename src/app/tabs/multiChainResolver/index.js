import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { ContentContainer, MultiChainAddrFieldContainer } from './containers';
import { AuthTabWrapper } from '../../auth'

import reducer from './reducer';
export default reducer;

class MultiChainResolverTab extends Component {
  render () {
    return (
      <AuthTabWrapper>
        <Container>
          <Row>
            <Col>
              <h2>admin resolution</h2>
            </Col>
          </Row>
          <Row>
            <Col>
              <MultiChainAddrFieldContainer />
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <ContentContainer />
            </Col>
          </Row>
        </Container>
      </AuthTabWrapper>
    )
  }
}

export { MultiChainResolverTab }
