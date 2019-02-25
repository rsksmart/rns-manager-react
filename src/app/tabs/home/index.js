import React, { Component } from 'react';
import { SearchDomainContainer, ResolveAddressContainer } from './containers';
import { Container, Row, Col, Card } from 'react-bootstrap';

const admin = (
  <Card>
    <Card.Body>
      <Card.Title>Admin your domain</Card.Title>
      <Card.Text>
        Set your resolution address<br />
        Create subdomains, admin them too.
      </Card.Text>
      <Card.Link href="/admin">Admin</Card.Link>
    </Card.Body>
  </Card>
);

const external = (
  <Card>
    <Card.Body>
      <Card.Title>Learn about RNS</Card.Title>
      <Card.Text>
        Be part of the internet of value revolution.
      </Card.Text>
      <Card.Link href="https://rifos.org">RIF OS</Card.Link>
      <Card.Link href="https://docs.rns.rsk.co">RNS Docs</Card.Link>
    </Card.Body>
  </Card>
)


class Home extends Component {
  render () {
    return(
      <Container>
        <Row>
          <Col><SearchDomainContainer /></Col>
        </Row>
        <Row>
          <Col>
            <h1>get your domain,<br />forget your address</h1>
          </Col>
          <Col>
            img
          </Col>
        </Row>
        <Row>
          <Col>{admin}</Col>
          <Col><ResolveAddressContainer /></Col>
          <Col>{external}</Col>
        </Row>
      </Container>
    );
  }
}

export default Home;
