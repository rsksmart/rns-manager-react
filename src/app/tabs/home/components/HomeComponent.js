import React from 'react';
import { Container, Row, Col, Image, Jumbotron, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import landingFront from '../RNS.png';
import { GetDomainStateContainer } from '../../../containers';
import { ResolveAddressContainer } from '../containers';

export default () => (
  <Row center={1}>
    <Col lg={{ span: 10, offset: 1 }} md={12}>
      <Container>
        <Row>
          <Col><h1 className='text-center'>rif name service</h1></Col>
        </Row>
        <Row>
          <Col><h2 className='text-center'>get your domain, forget your address</h2></Col>
        </Row>
        <Row>
          <Col><Image src={landingFront} alt='landing_front' fluid /></Col>
        </Row>
        <Row>
          <Col>
            <Jumbotron>
              <h3>register your domain</h3>
              <GetDomainStateContainer />
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>what is rns?</Card.Title>
                <Card.Text>
                  RIF Name Service provides an architecture which enables the identification of
                  blockchain addresses by human-readable names.
                </Card.Text>
                <Card.Link href='https://docs.rns.rifos.org' target='_blank'>Read more</Card.Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md={6} xs={12}>
            <Card>
              <Card.Body>
                <Card.Title>resolve a domin</Card.Title>
                <ResolveAddressContainer />
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} xs={12}>
            <Card>
              <Card.Body>
                <Card.Title>admin your domain</Card.Title>
                <ul>
                  <li>admin domain</li>
                  <li>admin domain reolution</li>
                  <li>create subdomains</li>
                </ul>
              <Link className='card-link' to='/admin' target='_blank'>Admin</Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md={6} xs={12}>
            <Card>
              <Card.Body>
                <Card.Title>develop</Card.Title>
                <ListGroup className="list-group-flush">
                  <ListGroupItem><a href='https://docs.rns.rifos.org/Libs' target='_blank' alt='libs'>libs</a></ListGroupItem>
                  <ListGroupItem><a href='https://docs.rns.rifos.org' target='_blank' alt ='docs'>docs</a></ListGroupItem>
                  <ListGroupItem><a href='https://github.com/rnsdomains' target='_blank' alt='github'>github</a></ListGroupItem>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} xs={12}>
            <Card>
              <Card.Body>
                <Card.Title>learn</Card.Title>
                <ListGroup className="list-group-flush">
                  <ListGroupItem><a href='https://docs.rifos.org/rif-whitepaper-en.pdf' target='_blank' alt='rif_whitepaper'>rif white paper</a></ListGroupItem>
                  <ListGroupItem><a href='https://docs.rifos.org/rif-directory-protocol-en.pdf' target='_blank' alt='rns_whitepapaer'>rns white paper</a></ListGroupItem>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Col>
  </Row>
);
