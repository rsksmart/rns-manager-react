import React, { Component } from 'react';
import { Container, Row, Col, Form, Button, Spinner, Alert } from 'react-bootstrap';
import { isValidName } from '../../../validations';
import { multilanguage } from 'redux-multilanguage';
import { ResolveAddrContainer, ResolveChainAddrContainer } from '../containers';


const renderResolutions = supportedInterfaces => {
  const hasAddr = supportedInterfaces.indexOf('addr') > -1;
  const hasChainAddr = supportedInterfaces.indexOf('chainAddr') > -1;

  return (
    <Container>
      <Row>
        {hasAddr && <Col lg={hasChainAddr ? 6 : { span: 6, offset: 3 }}><ResolveAddrContainer /></Col>}
        {hasChainAddr && <Col lg={6}><ResolveChainAddrContainer /></Col>}
      </Row>
    </Container>
  );
}

class ResolveComponent extends Component {
  constructor (props) {
    super(props);

    this.state = {
      value: props.name,
      isValid: true,
      showError: true
    };

    this.resolveValueChange = this.resolveValueChange.bind(this);
    this.validate = this.validate.bind(this);
    this.onResolve = this.onResolve.bind(this);
  }

  componentDidMount() {
    const { name, resolve } = this.props;

    if (name) {
      resolve();
    }
  }

  componentWillReceiveProps(newProps) {
    const { name, error } = this.props;

    if (name !== newProps.name) {
      newProps.resolve();
    }

    if (error !== newProps.error) {
      this.setState({ showError: true });
    }
  }

  resolveValueChange (event) {
    this.setState({ value: event.target.value });
  }

  onResolve (event) {
    event.preventDefault();

    const { search, resolve, name } = this.props;
    const { value } = this.state;

    if (this.validate()) {
      if (name === value) {
        return resolve();
      }

      search(value);
    }
  }

  validate () {
    const isValid = isValidName(this.state.value);
    this.setState({ isValid });
    return isValid;
  }

  render () {
    const { strings, loading, error, supportedInterfaces } = this.props;

    return (
      <Container>
        <Row>
          <Col>
            <Form onSubmit={this.onResolve}>
              <Form.Group>
                <Form.Control type='text' value={this.state.value} onChange={this.resolveValueChange} className={!this.state.isValid && 'is-invalid'} />
                <div className='invalid-feedback'>
                  {strings.invalid_name}
                </div>
              </Form.Group>
              <Button type="submit" size='sm' disabled={loading}>{strings.resolve}</Button>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col>
            {
              error ? <Alert variant='danger' dismissible show={this.state.showError} onClose={() => this.setState({ showError: false })}>{error}</Alert> : (
                loading ? <Spinner animation='grow' variant='primary' /> :
                renderResolutions(supportedInterfaces)
              )
            }
          </Col>
        </Row>
      </Container>
    );
  }
}

export default multilanguage(ResolveComponent);
