import React, { Component } from 'react';
import { Container, Row, Col, Button, Form, InputGroup, FormControl } from 'react-bootstrap';
import { multilanguage } from 'redux-multilanguage';

class SubdomainComponent extends Component {
  render () {
    const { strings, label, parent, owner, changeEdit, viewEdit, editting, set } = this.props;
    const subdomain = `${label}.${parent}`;

    let input;

    return (
      <Container>
        <Row>
          <Col md={3}>
            {subdomain}
          </Col>
          <Col md={6}>
            {`owner: ${owner}`}
          </Col>
          <Col md={3}>
            <Button variant='link' onClick={changeEdit}>{viewEdit ? strings.cancel : strings.set_owner}</Button>
          </Col>
        </Row>
        {
          viewEdit &&
          <React.Fragment>
            <br />
            <Form onSubmit={e => {
              e.preventDefault();
              set(input.value);
            }}>
              <InputGroup>
                <FormControl ref={node => (input = node)} />
                <InputGroup.Append>
                  <Button type="submit" size='sm'>{strings.set}</Button>
                </InputGroup.Append>
              </InputGroup>
            </Form>
          </React.Fragment>
        }
        {
          editting && '...'
        }
      </Container>
    )
  }
}

export default multilanguage(SubdomainComponent);
