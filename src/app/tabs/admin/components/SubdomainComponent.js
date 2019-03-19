import React, { Component } from 'react';
import { Container, Row, Col, Button, Form, InputGroup, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class SubdomainComponent extends Component {
  render () {
    const { label, parent, owner, changeEdit, viewEdit, editting, set } = this.props;
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
            <Button variant='link' onClick={changeEdit}>{viewEdit ? 'cancel' : 'set owner'}</Button>
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
                  <Button type="submit">set</Button>
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

export default SubdomainComponent;
