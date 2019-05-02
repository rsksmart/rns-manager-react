import React, { Component } from 'react';
import { Container, Row, Col, Form, FormControl, InputGroup, Button, Collapse, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { isValidName } from '../../../validations';
import { MyCryptoModal } from './MyCryptoModal';
import { multilanguage } from 'redux-multilanguage';

function getDisplayState (domain, auctionStateLoading, state, authDomain, login, strings) {
  if (!domain) return 'Search for a domain.';
  if (auctionStateLoading) return 'Loading...';

  switch(state) {
    case 0: return <Card.Text>{strings.open}<br /><Link to={`/start?domain=${domain}`}>{strings.register_your_domain}</Link></Card.Text>
    case 1: return <Card.Text>{strings.auction}<br /><Link to={`/bid?domain=${domain}`}>{strings.bid_in_auction}</Link></Card.Text>
    case 2: return <Card.Text>{strings.finalize}<br /><Link to={`/finalize?domain=${domain}`}>{strings.finalize_the_auction}</Link></Card.Text>
    case 4: return <Card.Text>{strings.reveal}<br /><Link to={`/unseal?domain=${domain}`}>{strings.reveal_your_bid}</Link></Card.Text>
    case 5: return (
      <Card.Text>
        {strings.owned}<br />
        {
          (domain === authDomain) ?
          <Link to={`/admin?domain=${domain}`}>{strings.admin_your_domain_title}</Link> :
          <React.Fragment>
            <Button onClick={() => login(domain)}>{strings.admin_your_domain_title}</Button><br />
            <Link to={`/search`}>{strings.search_another_domain}</Link>
            </React.Fragment>
        }
      </Card.Text>
    )
    default: return null
  }
}

class DomainStateComponent extends Component {
  constructor (props) {
    super(props);

    this.state = {
      searchValue: props.domain,
      isValid: true,
      showMyCrypto: false
    }

    this.searchValueChange = this.searchValueChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.validate = this.validate.bind(this);
    this.changeShowProcess = this.changeShowProcess.bind(this);
    this.changeShowMyCrypto = this.changeShowMyCrypto.bind(this);
  }

  componentDidMount () {
    const { domain, getState } = this.props;
    if (domain && getState) getState(domain);
  }

  searchValueChange (event) {
    this.setState({ searchValue: event.target.value });
  }

  onSearch (event) {
    event.preventDefault();
    const { domain, getState, search } = this.props;
    const { searchValue } = this.state;
    if (this.validate()) {
      if (domain === searchValue) this.getStateOrMyCrypto(getState)(searchValue);
      else search(searchValue);
    }
  }

  validate () {
    const isValid = isValidName(this.state.searchValue);
    this.setState({ isValid });
    return isValid;
  }

  changeShowProcess () {
    this.setState({ showProcess: !this.state.showProcess });
  }

  componentWillReceiveProps (newProps) {
    const { domain, getState } = newProps;
    if (this.props.domain !== domain) this.getStateOrMyCrypto(getState)(domain);
  }

  getStateOrMyCrypto (getState) {
    return getState || this.changeShowMyCrypto;
  }

  changeShowMyCrypto () {
    this.setState({ showMyCrypto: !this.state.showMyCrypto });
  }

  render () {
    const { strings, domain, auctionState, auctionStateLoading, authDomain, login } = this.props;

    const displayState = getDisplayState(domain, auctionStateLoading, auctionState, authDomain, login, strings);

    return (
      <Container>
        <Row>
          <Col>
            <Form onSubmit={this.onSearch}>
              <InputGroup className='mb-3'>
                <FormControl type='text' value={this.state.searchValue} onChange={this.searchValueChange} className={!this.state.isValid && 'is-invalid'} />
                <InputGroup.Append>
                  <Button type='submit' size='sm'>{strings.search}</Button>
                </InputGroup.Append>
                <div className='invalid-feedback'>
                  {strings.invalid_name}
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
                  <h2>{domain}</h2>
                </Card.Title>
                {displayState}
              </Card.Body>
              <Button variant='link' onClick={this.changeShowProcess}>
                {!this.state.showProcess ? strings.learn_about_process : strings.hide}
              </Button>
              <Collapse in={this.state.showProcess}>
                <Card.Body>
                  <hr />
                  <p> {strings.process}</p>
                  <ol>
                    <li>{strings.process_step_1}</li>
                    <li>{strings.process_step_2}</li>
                    <li>{strings.process_step_3}</li>
                    <li>{strings.process_step_4}</li>
                  </ol>
                  <p>
                    <Button variant='link' onClick={() => window.open('https://docs.rns.rifos.org/Operation/Register-a-name/', '_blank')}>{strings.learn_more}</Button>
                  </p>
                </Card.Body>
              </Collapse>
            </Card>
          </Col>
        </Row>
        <MyCryptoModal showMyCrypto={this.state.showMyCrypto} changeShowMyCrypto={this.changeShowMyCrypto} name={this.state.searchValue} />
      </Container>
    )
  }
}

export default multilanguage(DomainStateComponent);
