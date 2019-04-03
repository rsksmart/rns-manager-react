import React, { Component } from 'react';
import { Row, Col, Form, InputGroup, Button } from 'react-bootstrap';

class RegistryFieldComponent extends Component {
  componentDidMount () {
    const { get, domain } = this.props;
    get(domain);
  }

  componentWillReceiveProps (newProps) {
    const { get, domain } = this.props;
    if (newProps.domain !== domain) {
      get(newProps.domain);
    }
  }

  render () {
    const { domain, name, getting, value, changeEdit, editOpen, editting, set } = this.props;

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
                    <Form.Control ref={node => (input = node)} />
                    <InputGroup.Append>
                      <Button type="submit" size='sm'>edit</Button>
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
}

export default RegistryFieldComponent;
