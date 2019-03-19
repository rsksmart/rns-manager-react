import React, { Component } from 'react'
import { Container, Form, InputGroup, FormControl, Button } from 'react-bootstrap';
import { SubdomainContainer } from '../containers';

class SubdomainsListComponent extends Component {
  render () {
    const { onAddSubdomain, subdomains, domain } = this.props;

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
          {subdomains.map(subdomain => <SubdomainContainer key={subdomain.label} label={subdomain.label} parent={domain} owner={subdomain.owner} />)}
        </ul>
      </Container>
    );
  }
}

export default SubdomainsListComponent;
