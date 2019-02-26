import React, { Component } from 'react'
import { Container, Col, Row } from 'react-bootstrap';
import {
  DomainContainer,
  DomainOwnerContainer,
  DomainResolverContainer,
  DomainTTLContainer
} from './containers';
import { connect } from 'react-redux';
import { parse } from 'query-string';

const mapStateToProps = state => ({
  search: parse(state.router.location.search)
})

class Admin extends Component {
  render () {
    const { search } = this.props;

    return(
      <Container>
        <h2>Admin your domain</h2>
        <Row>
          <Col><DomainContainer domain={search.domain} /></Col>
        </Row>
        <Row>
          <Col><DomainOwnerContainer /></Col>
        </Row>
        <Row>
          <Col><DomainResolverContainer /></Col>
        </Row>
        <Row>
          <Col><DomainTTLContainer /></Col>
        </Row>
      </Container>
    );
  }
}

export default connect(mapStateToProps)(Admin);
