import React, { Component } from 'react'
import { Container, Form, InputGroup, FormControl, Button } from 'react-bootstrap';

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
          onAddSubdomain(input.value);
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
          {subdomains.map(subdomain => (
            <li key={subdomain}>{`${subdomain}.${domain}`}</li>
          ))}
        </ul>
      </Container>
    );
  }
}

export default SubdomainsListComponent;
