import React, { Component } from 'react';
import { Row, Col, Form, InputGroup, Button } from 'react-bootstrap';
import { multilanguage } from 'redux-multilanguage';

class FieldComponent extends Component {
  constructor (props) {
    super(props);

    this.state = {
      inputValue: props.preloadedValue,
      isValid: true,
      validationError: null
    };

    this.validate = this.validate.bind(this);
    this.onInputValueChange = this.onInputValueChange.bind(this);
  }

  validate () {
    const { inputValue } = this.state;
    const validationError = this.props.validate(inputValue);
    const isValid = validationError === null;
    this.setState({ validationError, isValid });
    return isValid;
  }

  componentDidMount () {
    const { get, domain, preloadedValue, changeEdit } = this.props;
    get(domain);

    if (preloadedValue) {
      changeEdit();
    }
  }

  componentWillReceiveProps (newProps) {
    const { get, domain } = this.props;
    if (newProps.domain !== domain) {
      get(newProps.domain);
    }
  }

  onInputValueChange (event) {
    this.setState({ inputValue: event.target.value });
  }

  render () {
    const { strings, fieldName, type, getting, value, changeEdit, editOpen, set, editting } = this.props;

    const { inputValue } = this.state;

    return (
      <React.Fragment>
        <Row>
          <Col md={2}>{fieldName}</Col>
          <Col md={8}>{getting ? '...' : value}</Col>
          <Col md={2}>
            <Button variant='link' onClick={changeEdit}>{editOpen ? strings.cancel : strings.edit}</Button>
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
                  if (this.validate()) set(inputValue);
                }}>
                  <Form.Group>
                    <InputGroup>
                      <Form.Control type={type} value={inputValue} onChange={this.onInputValueChange} className={!this.state.isValid ? 'is-invalid' : null}/>
                      <InputGroup.Append>
                        <Button type='submit' size='sm'>{strings.edit}</Button>
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

export default multilanguage(FieldComponent);
