import React from 'react';
import { Header, ResolverAddressComponent, DomainStateComponent } from './components';
import { Container, Row, Col } from 'react-bootstrap';
import { Switch, Route } from 'react-router';

const Home = () => (
  <div>
    <Container>
      <Row>
        <Col><DomainStateComponent /></Col>
      </Row>
      <Row>
        <Col><ResolverAddressComponent /></Col>
      </Row>
    </Container>
  </div>
);

const NoMatch = () => <p>404! Page not found :(</p>

const routes = (
  <div>
    <Header />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route component={NoMatch} />
    </Switch>
  </div>
);

export default routes;
