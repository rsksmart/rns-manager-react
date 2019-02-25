import React, { Component } from 'react';
import { connect } from 'react-redux';
import { parse } from 'query-string';
import { Container, Row, Col } from 'react-bootstrap';
import { DomainStateContainer } from './containers';

const mapStateToProps = state => ({
  search: parse(state.router.location.search)
})

class Search extends Component {
  render () {
    const { search } = this.props;
    return (
      <Container>
        <Row>
          <Col><DomainStateContainer domain={search.domain} /></Col>
        </Row>
      </Container>
    );
  }
}

export default connect(mapStateToProps)(Search);
