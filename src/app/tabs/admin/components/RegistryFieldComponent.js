import React, { Component } from 'react';
import { Row, Col, Form, InputGroup, Button } from 'react-bootstrap';

class RegistryFieldComponent extends Component {
  constructor (props) {
    super(props);

    this.state = {
      isValid: true,
      validationError: null
    };

    this.validate = this.validate.bind(this);
  }

  validate (value) {
    const validationError = this.props.validate(value);
    const isValid = validationError === null;
    this.setState({ validationError, isValid });
    return isValid;
  }

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
    const { fieldName, type, getting, value, changeEdit, editOpen, set, editting } = this.props;

    let input;

    return (
      <React.Fragment>
        <Row>
          <Col md={2}>{fieldName}</Col>
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
                  if (this.validate(input.value)) set(input.value);
                }}>
                  <Form.Group>
                    <InputGroup>
                      <Form.Control type={type} ref={node => (input = node)} className={!this.state.isValid ? 'is-invalid' : null}/>
                      <InputGroup.Append>
                        <Button type='submit' size='sm'>edit</Button>
                      </InputGroup.Append>
                      <div className='invalid-feedback'>
                        {this.state.validationError}
                      </div>
                    </InputGroup>
                  </Form.Group>
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
