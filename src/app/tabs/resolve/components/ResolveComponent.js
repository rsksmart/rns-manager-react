import React, { Component } from 'react';
import propTypes from 'prop-types';
import { isValidAddress } from 'rskjs-util';
import {
  Container, Row, Col, Form, Button, Alert,
} from 'react-bootstrap';
import { multilanguage } from 'redux-multilanguage';
import { isValidDomain } from '../../../validations';
import {
  ResolveAddrContainer, ResolveChainAddrContainer, ResolveNameContainer, ResolveContentContainer,
} from '../containers';
import UserWaitingComponent from '../../../components/UserWaitingComponent';

const renderResolutions = (supportedInterfaces) => {
  const hasAddr = supportedInterfaces.indexOf('addr') > -1;
  const hasChainAddr = supportedInterfaces.indexOf('chainAddr') > -1;
  const hasMulticoin = supportedInterfaces.indexOf('multicoin') > -1;
  const hasName = supportedInterfaces.indexOf('name') > -1;

  return (
    <Container className="page">
      <Row>
        {
          hasAddr && (
            <Col lg={(hasChainAddr || hasMulticoin) ? 6 : { span: 6, offset: 3 }}>
              <ResolveAddrContainer title="RSK" />
            </Col>
          )
        }
        {
          (hasChainAddr || hasMulticoin) && (
            <Col lg={6}>
              <ResolveChainAddrContainer hasMulticoin={hasMulticoin} />
            </Col>
          )
        }
      </Row>
      <Row>
        {
          hasName && (
            <Col md={{ span: 6, offset: 3 }}>
              <ResolveNameContainer title="NAME" />
            </Col>
          )
        }
      </Row>
      <Row>
        <ResolveContentContainer />
      </Row>
    </Container>
  );
};

class ResolveComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.name,
      isValid: true,
      showError: true,
    };

    this.resolveValueChange = this.resolveValueChange.bind(this);
    this.validate = this.validate.bind(this);
    this.onResolve = this.onResolve.bind(this);
  }

  componentDidMount() {
    const { name, resolve, reset } = this.props;

    if (name) {
      resolve();
    } else {
      reset();
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

  onResolve(event) {
    event.preventDefault();

    const { search, resolve, name } = this.props;
    const { value } = this.state;

    if (this.validate()) {
      if (name === value) {
        return resolve();
      }

      search(value);
    }

    return null;
  }

  resolveValueChange(event) {
    this.setState({ value: event.target.value });
  }

  validate() {
    const { value } = this.state;
    const isValid = isValidDomain(value) || isValidAddress(value.toLowerCase());
    this.setState({ isValid });
    return isValid;
  }

  render() {
    const {
      strings, loading, error, supportedInterfaces,
    } = this.props;
    const { value, isValid, showError } = this.state;

    let result;

    if (error) {
      result = <Alert variant="danger" dismissible show={showError} onClose={() => this.setState({ showError: false })}>{error}</Alert>;
    } else if (loading) {
      result = <UserWaitingComponent />;
    } else {
      result = renderResolutions(supportedInterfaces);
    }

    return (
      <Container className="page resolver">
        <h2>{strings.resolve}</h2>
        <Form onSubmit={this.onResolve} className="search">
          <Row>
            <Col md={10}>
              <Form.Group>
                <input
                  type="text"
                  value={value}
                  onChange={this.resolveValueChange}
                  className={isValid ? undefined : 'is-invalid'}
                  placeholder={strings.resolve_placeholder}
                />
                <div className="invalid-feedback">
                  {strings.invalid_name}
                </div>
              </Form.Group>
            </Col>
            <Col md={2}>
              <Button
                type="submit"
                disabled={loading}
              >
                {strings.resolve}
              </Button>
            </Col>
          </Row>
        </Form>
        <Row>
          <Col>
            {result}
          </Col>
        </Row>
      </Container>
    );
  }
}

ResolveComponent.propTypes = {
  name: propTypes.string.isRequired,
  resolve: propTypes.func.isRequired,
  reset: propTypes.func.isRequired,
  error: propTypes.string,
  search: propTypes.func.isRequired,
  strings: propTypes.shape({
    resolve: propTypes.string.isRequired,
    invalid_name: propTypes.string.isRequired,
    resolve_placeholder: propTypes.string.isRequired,
  }).isRequired,
  loading: propTypes.bool.isRequired,
  supportedInterfaces: propTypes.arrayOf(propTypes.string).isRequired,
};

ResolveComponent.defaultProps = {
  error: null,
};

export default multilanguage(ResolveComponent);
