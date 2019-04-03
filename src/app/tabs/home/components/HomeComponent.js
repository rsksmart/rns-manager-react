import React from 'react';
import { ResolveAddressContainer } from '../containers';
import { TabWithSearchComponent } from '../../../components';
import { Container, Row, Col, Card, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import rnsImage from '../RNS.png';

const admin = (
  <Card>
    <Card.Body>
      <Card.Title>Admin your domain</Card.Title>
      <Card.Text>
        Set your resolution address<br />
        Create subdomains, admin them too.
      </Card.Text>
      <Link to='/admin' className='card-link'>Admin domain</Link>
      <Link to='/publicResolver' className='card-link'>Manage resolution</Link>
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

const HomeComponent = () => (
  <TabWithSearchComponent>
    <Container>
      <Row>
        <Col style={{height: 300}} md={4}>
          <h1>get your domain,<br />forget your address</h1>
        </Col>
        <Col style={{height: 300}} md={8}>
          <Image src={rnsImage} fluid />
        </Col>
      </Row>
      <Row>
        <Col>{admin}</Col>
        <Col><ResolveAddressContainer /></Col>
        <Col>{external}</Col>
      </Row>
    </Container>
  </TabWithSearchComponent>
);

export default HomeComponent;
