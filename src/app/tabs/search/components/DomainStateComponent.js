import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Collapse } from 'react-bootstrap';
import { TabWithSearchComponent } from '../../../components';

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
      showProcess: false
    }

    this.changeShowProcess = this.changeShowProcess.bind(this);
  }

  changeShowProcess () {
    this.setState({ showProcess: !this.state.showProcess });
  }

  componentDidMount() {
    const { domain, getState } = this.props;
    getState(domain);
  }

  componentWillReceiveProps(newProps) {
    const { domain, getState } = newProps;
    if(domain !== this.props.domain) {
      getState(domain);
    }
  }

  render () {
    const { domain, auctionState, auctionStateLoading, authDomain, login } = this.props;

    const displayState = getDisplayState(domain, auctionStateLoading, auctionState, authDomain, login);

    return (
      <TabWithSearchComponent>
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
            <Card.Body style={{ textAlign: 'center'}}>
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
      </TabWithSearchComponent>
    );
  }
}

export default DomainStateComponent;
