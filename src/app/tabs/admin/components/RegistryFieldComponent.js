import React, { Component } from 'react';
import {
  Row,
  Col,
  Form,
  InputGroup,
  FormControl,
  Button,
  Alert
} from 'react-bootstrap';

class RegistryFieldComponent extends Component {
  componentDidMount () {
    const { getValue, domain } = this.props;
    console.log(getValue)
    getValue(domain);
  }

  render () {
    const { domain, name, getting, value, changeEdit, editOpen, editting, submit, response, hasError } = this.props;

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
                  submit(domain, input.value);
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
      </React.Fragment>
    );
  }
}

export default RegistryFieldComponent;
