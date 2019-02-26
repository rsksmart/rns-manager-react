import React, { Component } from 'react';
import { Row, Col, Button, Form, FormControl, InputGroup } from 'react-bootstrap';

class DomainOwnerComponent extends Component {
  render () {
    const { loading, address, viewEdit, onViewEdit, onEditOwner, domain } = this.props;

    let input;

    return (
      <Row>
        <Col>
          <label>Owner: {loading ? '...' : address}</label>
          {!viewEdit ?
            <Button onClick={onViewEdit} variant="link">edit</Button> :
            <Form onSubmit={e => {
              e.preventDefault();
              onEditOwner(domain, input.value);
            }}>
              <InputGroup>
                <FormControl ref={node => (input = node)} />
                <InputGroup.Append>
                  <Button type="submit">Edit owner</Button>
                </InputGroup.Append>
              </InputGroup>
            </Form>
          }
        </Col>
      </Row>
    )
  }
}

export default DomainOwnerComponent;
