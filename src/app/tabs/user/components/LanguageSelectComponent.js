import React, { Component } from 'react';
import propTypes from 'prop-types';
import {
  Row, Col, FormGroup, Form,
} from 'react-bootstrap';
import { multilanguage } from 'redux-multilanguage';

class LanguageSelectComponent extends Component {
  constructor(props) {
    super(props);

    this.state = { language: props.language };

    this.onLanguageChange = this.onLanguageChange.bind(this);
  }

  onLanguageChange(event) {
    const { value } = event.target;
    const { changeLanguage } = this.props;

    this.setState({ language: value });

    changeLanguage(value);
  }

  render() {
    const { strings } = this.props;
    const { language } = this.state;

    return (
      <FormGroup as={Row}>
        <Form.Label column md={4}>{strings.language}</Form.Label>
        <Col md={8}>
          <Form.Control as="select" onChange={this.onLanguageChange} value={language}>
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="zh">简体中文</option>
            <option value="ja">日本語</option>
            <option value="ko">한국어</option>
            <option value="pt">Português</option>
            <option value="ru">Русский</option>
          </Form.Control>
        </Col>
      </FormGroup>
    );
  }
}

LanguageSelectComponent.propTypes = {
  language: propTypes.string.isRequired,
  changeLanguage: propTypes.func.isRequired,
  strings: propTypes.shape({
    language: propTypes.string,
  }).isRequired,
};

export default multilanguage(LanguageSelectComponent);
