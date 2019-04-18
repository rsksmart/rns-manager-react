import React, { Component } from 'react'
import { Container, Row, Col, Form, InputGroup, FormControl, Button } from 'react-bootstrap';
import { SubdomainContainer } from '../containers';

class SubdomainsListComponent extends Component {
  render () {
    const { onAddSubdomain, subdomains, domain } = this.props;

    let input;

    return (
      <Container>
        <Row>
          <Col>
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
                  <Button type="submit" size='sm'>+</Button>
                </InputGroup.Append>
              </InputGroup>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col>
            <ul>
              {subdomains.map(subdomain => <SubdomainContainer key={subdomain} label={subdomain} />)}
            </ul>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default SubdomainsListComponent;
