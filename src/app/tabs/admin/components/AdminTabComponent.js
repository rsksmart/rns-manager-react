import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { OwnerContainer, ResolverContainer, TtlContainer, SubdomainsListContainer } from '../containers';
import { multilanguage } from 'redux-multilanguage';
import { AuthTabWrapper } from '../../../auth';

export default multilanguage(props => {
  const { strings, name } = props;

  return (
    <AuthTabWrapper>
      <Container>
        <h2>{strings.admin} <code>{name}</code></h2>
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
            <Link to='/publicResolver'>{strings.admin_resolution}</Link>
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
            <h3>{strings.subdomains}</h3>
            <SubdomainsListContainer />
          </Col>
        </Row>
      </Container>
    </AuthTabWrapper>
  )
})