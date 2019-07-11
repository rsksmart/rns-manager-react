import React from 'react';
import {
  Container, Row, Col, Jumbotron, Card, ListGroup, ListGroupItem,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { multilanguage } from 'redux-multilanguage';
import { GetDomainStateContainer } from '../../../containers';
import { ResolveAddressContainer } from '../containers';

export default multilanguage((props) => {
  const { strings } = props;

  return (
    <Row center={1}>
      <Col lg={{ span: 10, offset: 1 }} md={12}>
        <Container>
          <Row>
            <Col><h1 className="text-center">{strings.home_title}</h1></Col>
          </Row>
          <Row>
            <Col><h2 className="text-center">{strings.home_subtitle}</h2></Col>
          </Row>
          <Row>
            <Col>
              <Jumbotron>
                <h3>{strings.register_your_domain}</h3>
                <GetDomainStateContainer />
              </Jumbotron>
            </Col>
          </Row>
          <Row>
            <Col style={{ padding: 10 }}>
              <Card>
                <Card.Body>
                  <Card.Title>{strings.what_is_rns_title}</Card.Title>
                  <Card.Text>{strings.what_is_rns_text}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col style={{ padding: 10 }} md={6} xs={12}>
              <Card>
                <Card.Body>
                  <Card.Title>{strings.resolve_a_domain}</Card.Title>
                  <ResolveAddressContainer />
                </Card.Body>
              </Card>
            </Col>
            <Col style={{ padding: 10 }} md={6} xs={12}>
              <Card>
                <Card.Body>
                  <Card.Title>{strings.admin_your_domain_title}</Card.Title>
                  <p>
                    {strings.admin_your_domain_action_1}
                    <br />
                    {strings.admin_your_domain_action_2}
                    <br />
                    {strings.admin_your_domain_action_3}
                  </p>
                  <Link className="card-link" to="/admin" rel="noopener noreferrer">{strings.admin}</Link>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col style={{ padding: 10 }} md={6} xs={12}>
              <Card>
                <Card.Body>
                  <Card.Title>{strings.develop}</Card.Title>
                  <ListGroup className="list-group-flush">
                    <ListGroupItem><a href="https://docs.rns.rifos.org/Libs" target="_blank" alt="libs" rel="noopener noreferrer">{strings.libs}</a></ListGroupItem>
                    <ListGroupItem><a href="https://docs.rns.rifos.org" target="_blank" alt="docs" rel="noopener noreferrer">{strings.docs}</a></ListGroupItem>
                    <ListGroupItem><a href="https://github.com/rnsdomains" target="_blank" alt="github" rel="noopener noreferrer">{strings.github}</a></ListGroupItem>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
            <Col style={{ padding: 10 }} md={6} xs={12}>
              <Card>
                <Card.Body>
                  <Card.Title>{strings.learn}</Card.Title>
                  <ListGroup className="list-group-flush">
                    <ListGroupItem><a href="https://docs.rifos.org/rif-whitepaper-en.pdf" target="_blank" alt="rif_whitepaper" rel="noopener noreferrer">{strings.rif_white_paper}</a></ListGroupItem>
                    <ListGroupItem><a href="https://docs.rifos.org/rif-directory-protocol-en.pdf" target="_blank" alt="rns_whitepapaer" rel="noopener noreferrer">{strings.rns_white_paper}</a></ListGroupItem>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </Col>
    </Row>
  );
});
