import React, { Component } from 'react';
import { Row, Col, Button, Form, InputGroup } from 'react-bootstrap';

class PublicResolverFieldComponent extends Component {
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
    const { domain, get } = this.props;
    get(domain);
  }

  componentWillReceiveProps (newProps) {
    const { domain, get } = this.props;
    if(domain !== newProps.domain) {
      get(newProps.domain);
    }
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
                  if (this.validate(input.value)) set(domain, input.value);
                }}>
                  <InputGroup>
                    <Form.Control type='text' ref={node => (input = node)} className={!this.state.isValid ? 'is-invalid' : null} />
                    <InputGroup.Append>
                      <Button type="submit" size='sm'>edit</Button>
                    </InputGroup.Append>
                    <div className='invalid-feedback'>
                      {this.state.validationError}
                    </div>
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
