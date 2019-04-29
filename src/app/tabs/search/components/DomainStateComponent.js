import React, { Component } from 'react';
import { Container, Row, Col, Form, FormControl, InputGroup, Button, Collapse, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { isValidName } from '../../../validations';
import { MyCryptoModal } from './MyCryptoModal';

function getDisplayState (domain, auctionStateLoading, state, authDomain, login) {
  if (!domain) return 'Search for a domain.';
  if (auctionStateLoading) return 'Loading...';

  switch(state) {
    case 0: return <Card.Text>Open.<br /><Link to={`/start?domain=${domain}`}>Register the domain</Link></Card.Text>
    case 1: return <Card.Text>Auction.<br /><Link to={`/bid?domain=${domain}`}>Bid in the domain auction</Link></Card.Text>
    case 2: return <Card.Text>Finalize.<br /><Link to={`/finalize?domain=${domain}`}>Finalize the auction</Link></Card.Text>
    case 4: return <Card.Text>Reveal.<br /><Link to={`/unseal?domain=${domain}`}>Reveal your bid</Link></Card.Text>
    case 5: return (
      <Card.Text>
        Owned.<br />
        {
          (domain === authDomain) ?
          <Link to={`/admin?domain=${domain}`}>Admin your domain</Link> :
          <React.Fragment>
            <Button onClick={() => login(domain)}>Admin your domain</Button><br />
            <Link to={`/search`}>Search for another domain</Link>
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
    const { domain, auctionState, auctionStateLoading, authDomain, login } = this.props;

    const displayState = getDisplayState(domain, auctionStateLoading, auctionState, authDomain, login);

    return (
      <Container>
        <Row>
          <Col>
            <Form onSubmit={this.onSearch}>
              <InputGroup className='mb-3'>
                <FormControl type='text' value={this.state.searchValue} onChange={this.searchValueChange} className={!this.state.isValid && 'is-invalid'} />
                <InputGroup.Append>
                  <Button type='submit' size='sm'>Search</Button>
                </InputGroup.Append>
                <div className='invalid-feedback'>
                  Invalid name.
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
                {!this.state.showProcess ? 'Learn about process' : 'Hide'}
              </Button>
              <Collapse in={this.state.showProcess}>
                <Card.Body>
                  <hr />
                  <p>
                    Any user can start an auction for any available domain name.
                    It is a public auction that respects the Vickrey auction principles.<br />
                    A Vickrey auction is a type of blind auction.
                    Bidders submit written bids without knowing the bid of the other people in the auction.
                    The highest bidder wins but the price paid is the second-highest bid.<br /><br />
                    There are 4 steps to follow:
                  </p>
                  <ol>
                    <li>Start an auction for a domain</li>
                    <li>Bid in the auction</li>
                    <li>Unseal the bid</li>
                    <li>Finalize the auction</li>
                  </ol>
                  <p>
                    <Button variant='link' onClick={() => window.open('https://docs.rns.rifos.org/Operation/Register-a-name/', '_blank')}>
                      Learn more
                    </Button>
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

export default DomainStateComponent;
