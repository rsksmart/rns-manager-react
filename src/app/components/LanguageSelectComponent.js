import React, { Component } from 'react';
import propTypes from 'prop-types';
import {
  FormGroup, Form,
} from 'react-bootstrap';

const selectStyle = {
  background: 'none',
  color: '#149dd9',
  borderColor: '#149dd9',
  width: '90px',
  margin: '0px 10px',
};

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
    const { language } = this.state;

    return (
      <FormGroup>
        <Form.Control size="lg" as="select" onChange={this.onLanguageChange} value={language} style={selectStyle}>
          <option value="en">English</option>
          <option value="es">Español</option>
          <option value="zh">简体中文</option>
          <option value="ja">日本語</option>
          <option value="ko">한국어</option>
          <option value="pt">Português</option>
          <option value="ru">Русский</option>
        </Form.Control>
      </FormGroup>
    );
  }
}

LanguageSelectComponent.propTypes = {
  language: propTypes.string.isRequired,
  changeLanguage: propTypes.func.isRequired,
};

export default LanguageSelectComponent;
