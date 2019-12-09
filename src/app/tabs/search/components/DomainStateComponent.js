import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Container, Row, Col, Form, FormControl, InputGroup, Button, Collapse, Card, Spinner,
} from 'react-bootstrap';
import { multilanguage } from 'redux-multilanguage';
import { isValidName } from '../../../validations';

// eslint-disable-next-line max-len
function getDisplayState(domain, domainStateLoading, owned, blocked, owner, requestingOwner, strings) {
  if (!domain) return 'Search for a domain.';
  if (domainStateLoading) return <Spinner animation="grow" variant="primary" />;

  if (owned) {
    if (requestingOwner) {
      return (
        <Card.Text>
          {strings.owned}
          <br />
          <Spinner animation="grow" variant="primary" />
        </Card.Text>
      );
    }
    return (
      <Card.Text>
        {strings.owned}
        <br />
        <strong>
          {strings.owner}
          {': '}
        </strong>
        {owner}
        <br />
        <Link to={`/resolve?name=${domain}.rsk`} className="btn btn-primary">{strings.resolve}</Link>
        <br />
        <Link to="/search">{strings.search_another_domain}</Link>
      </Card.Text>
    );
  }

  if (blocked) {
    return strings.blocked_domain;
  }

  return (
    <Card.Text>
      {strings.open}
      <br />
      <Link to={`/registrar?domain=${domain}`}>{strings.register_your_domain}</Link>
    </Card.Text>
  );
}

class DomainStateComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchValue: props.domain,
      invalid: null,
    };

    this.searchValueChange = this.searchValueChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.validate = this.validate.bind(this);
    this.changeShowProcess = this.changeShowProcess.bind(this);
  }

  componentDidMount() {
    const { domain, getState } = this.props;
    if (domain && getState) getState(domain);
  }

  componentWillReceiveProps(newProps) {
    const { getState } = newProps;
    const { domain } = this.props;
    if (domain !== newProps.domain) getState(newProps.domain);
  }

  onSearch(event) {
    event.preventDefault();
    const { domain, getState, search } = this.props;
    const { searchValue } = this.state;
    if (!this.validate()) {
      if (domain === searchValue) getState(searchValue);
      else search(searchValue);
    }
  }

  searchValueChange(event) {
    this.setState({ searchValue: event.target.value });
  }

  validate() {
    const { searchValue } = this.state;
    const invalid = isValidName(searchValue);
    this.setState({ invalid });
    return invalid;
  }

  changeShowProcess() {
    const { showProcess } = this.state;
    this.setState({ showProcess: !showProcess });
  }

  render() {
    const {
      strings, domain, owned, domainStateLoading, blocked, owner, requestingOwner,
    } = this.props;
    const { searchValue, invalid, showProcess } = this.state;

    let domainDisplay = '';

    if (domain) {
      domainDisplay = domain.split('.').length === 1 ? `${domain}.rsk` : domain;
    }

    const displayState = getDisplayState(
      domain, domainStateLoading, owned, blocked, owner, requestingOwner, strings,
    );

    return (
      <Container>
        <Row>
          <Col>
            <Form onSubmit={this.onSearch}>
              <InputGroup className="mb-3">
                <FormControl type="text" value={searchValue} onChange={this.searchValueChange} className={invalid && 'is-invalid'} />
                <InputGroup.Append>
                  <InputGroup.Text>{strings.rskTld}</InputGroup.Text>
                </InputGroup.Append>
                <InputGroup.Append>
                  <Button type="submit" size="sm">{strings.search}</Button>
                </InputGroup.Append>
                <div className="invalid-feedback">
                  {invalid}
                </div>
              </InputGroup>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>
                  <h2>{domainDisplay}</h2>
                </Card.Title>
                {displayState}
              </Card.Body>
              <Button variant="link" onClick={this.changeShowProcess}>
                {!showProcess ? strings.learn_about_process : strings.hide}
              </Button>
              <Collapse in={showProcess}>
                <Card.Body>
                  <hr />
                  <p>
                    {' '}
                    {strings.process}
                  </p>
                  <ol>
                    <li>{strings.process_step_1}</li>
                    <li>{strings.process_step_2}</li>
                    <li>{strings.process_step_3}</li>
                  </ol>
                  <p>
                    <Button variant="link" onClick={() => window.open('https://docs.rns.rifos.org/Operation/Register-a-name/', '_blank')}>{strings.learn_more}</Button>
                  </p>
                </Card.Body>
              </Collapse>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

DomainStateComponent.propTypes = {
  strings: propTypes.shape({
    search: propTypes.string.isRequired,
    invalid_name: propTypes.string.isRequired,
    learn_about_process: propTypes.string.isRequired,
    hide: propTypes.string.isRequired,
    process: propTypes.string.isRequired,
    process_step_1: propTypes.string.isRequired,
    process_step_2: propTypes.string.isRequired,
    process_step_3: propTypes.string.isRequired,
    learn_more: propTypes.string.isRequired,
    rskTld: propTypes.string.isRequired,
    blocked_domain: propTypes.string.isRequired,
  }).isRequired,
  domain: propTypes.string.isRequired,
  owned: propTypes.bool,
  owner: propTypes.string,
  blocked: propTypes.bool,
  requestingOwner: propTypes.bool.isRequired,
  domainStateLoading: propTypes.bool.isRequired,
  getState: propTypes.func.isRequired,
  search: propTypes.func.isRequired,
};

DomainStateComponent.defaultProps = {
  owned: false,
  owner: '',
  blocked: false,
};

export default multilanguage(DomainStateComponent);
