import React, { Component } from 'react';
import { Row, Col, Button, Form, InputGroup, FormControl, Alert } from 'react-bootstrap';

class PublicResolverFieldComponent extends Component {
  componentDidMount () {
    const { domain, get } = this.props;
    get(domain);
  }
  render () {
    const { name, domain, getting, value, changeEdit, editOpen, editting, set } = this.props;

    let input;

    return (
      <React.Fragment>
        <Row>
          <Col md={2}>{name}</Col>
          <Col md={8}>{getting ? '...' : value}</Col>
          <Col md={2}>
            <Button variant='link' onClick={changeEdit}>{editOpen ? 'cancel' : 'edit'}</Button>
          </Col>
        </Row>
        {
          editOpen &&
          <React.Fragment>
            <br />
            <Row>
              <Col>
                <Form onSubmit={e => {
                  e.preventDefault();
                  set(domain, input.value);
                }}>
                  <InputGroup>
                    <FormControl ref={node => (input = node)} />
                    <InputGroup.Append>
                      <Button type="submit">edit</Button>
                    </InputGroup.Append>
                  </InputGroup>
                </Form>
              </Col>
            </Row>
          </React.Fragment>
        }
        {
          editting && '...'
        }
      </React.Fragment>
    );
  }
};

export default PublicResolverFieldComponent;
