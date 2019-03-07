import React, { Component } from 'react'
import { Container, Form, InputGroup, FormControl, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const SubdomainComponent = (subdomain, owner) => {
  return (
    <Container>
      <Row>
        <Col md={3}>
          {subdomain}
        </Col>
        <Col md={7}>
          {`owner: ${owner}`}
        </Col>
        <Col md={2}>
          <Link to={`/admin?domain=${subdomain}`}>admin</Link>
        </Col>
      </Row>
    </Container>
  );
};

class SubdomainsListComponent extends Component {
  render () {
    const { onAddSubdomain, subdomains, searchDomain } = this.props;

    const domain = this.props.domain || searchDomain

    let input;

    return (
      <Container>
        <h3>Subdomains</h3>
        <Form onSubmit={e => {
          e.preventDefault();
          onAddSubdomain(domain, input.value);
          input.value = '';
        }}>
          <InputGroup className="mb-3">
            <FormControl ref={node => (input = node)} />
            <InputGroup.Append>
              <InputGroup.Text>{domain}</InputGroup.Text>
            </InputGroup.Append>
            <InputGroup.Append>
              <Button type="submit">+</Button>
            </InputGroup.Append>
          </InputGroup>
        </Form>
        <ul>
          {subdomains.map(subdomain => SubdomainComponent(`${subdomain.label}.${domain}`, subdomain.owner))}
        </ul>
      </Container>
    );
  }
}

export default SubdomainsListComponent;
