import React, { Component } from 'react';
import { Row, Col, FormGroup, Form } from 'react-bootstrap'
import { multilanguage } from 'redux-multilanguage';

class LanguageSelectComponent extends Component {
  constructor (props) {
    super(props);

    this.state ={ language: props.language };

    this.onLanguageChange = this.onLanguageChange.bind(this);
  }

  onLanguageChange (event) {
    const { value } = event.target;
    const { changeLanguage } = this.props;
    this.setState({ language: value });
    changeLanguage(value);
  }

  render () {
    const { strings } = this.props;

    return (
      <FormGroup as={Row}>
        <Form.Label column md={4}>{strings.language}</Form.Label>
        <Col md={8}>
          <Form.Control as='select' onChange={this.onLanguageChange} value={this.state.language}>
            <option value='en'>English</option>
          </Form.Control>
        </Col>
      </FormGroup>
    )
  }
}

export default multilanguage(LanguageSelectComponent);

