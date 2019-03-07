import React, { Component } from 'react';
import { Row, Col, Button, Form, InputGroup, FormControl, Alert } from 'react-bootstrap';

class PublicResolverFieldComponent extends Component {
  componentDidMount () {
    const { domain, getValue } = this.props;
    getValue(domain);
  }
  render () {
    const { name, domain, getting, value, errorGet, changeEdit, editOpen, editting, setValue, responseSet, setHasError } = this.props;

    let input;

    return (
      <React.Fragment>
        <Row>
          <Col md={2}>{name}</Col>
          <Col md={8}>{getting ? '...' : (value || errorGet)}</Col>
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
                  setValue(domain, input.value);
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
        {
          responseSet &&
          <React.Fragment>
            <br />
            <Row>
              <Col>
                <Alert variant={setHasError ? 'danger' : 'success'}>
                  {responseSet}
                </Alert>
              </Col>
            </Row>
          </React.Fragment>
        }
      </React.Fragment>
    );
  }
};

export default PublicResolverFieldComponent;
