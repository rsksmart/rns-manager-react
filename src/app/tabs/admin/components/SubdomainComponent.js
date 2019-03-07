import React, { Component } from 'react';
import { Container, Row, Col, Button, Form, InputGroup, FormControl, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class SubdomainComponent extends Component {
  render () {
    const { label, parent, owner, changeViewEdit, viewEdit, editting, submit, response, hasError } = this.props;
    const subdomain = `${label}.${parent}`;

    let input;

    return (
      <Container>
        <Row>
          <Col md={2}>
            {subdomain}
          </Col>
          <Col md={6}>
            {`owner: ${owner}`}
          </Col>
          <Col md={2}>
            <Link to={`/admin?domain=${subdomain}`}>admin</Link>
          </Col>
          <Col md={2}>
            <Button variant='link' onClick={changeViewEdit}>{viewEdit ? 'cancel' : 'set owner'}</Button>
          </Col>
        </Row>
        {
          viewEdit &&
          <React.Fragment>
            <br />
            <Form onSubmit={e => {
              e.preventDefault();
              submit(input.value);
            }}>
              <InputGroup>
                <FormControl ref={node => (input = node)} />
                <InputGroup.Append>
                  <Button type="submit">set</Button>
                </InputGroup.Append>
              </InputGroup>
            </Form>
          </React.Fragment>
        }
        {
          editting && '...'
        }
        {
          response &&
          <React.Fragment>
            <br />
            <Row>
              <Col>
                <Alert variant={hasError ? 'danger' : 'success'}>
                  {response}
                </Alert>
              </Col>
            </Row>
          </React.Fragment>
        }
      </Container>
    )
  }
}

export default SubdomainComponent;
