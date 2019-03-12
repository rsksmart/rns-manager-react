import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

function getDisplayState (domain, auctionStateLoading, state) {
  if (!domain) return 'Search for a domain.';
  if (auctionStateLoading) return 'Loading...';

  switch(state) {
    case 0: return <p>Open.<br /><Link to={`/start?domain=${domain}`}>Register the domain</Link></p>
    case 1: return <p>Auction.<br /><Link to={`/bid?domain=${domain}`}>Bid in the domain auction</Link></p>
    case 2: return <p>Finalize.<br /><Link to={`/finalize?domain=${domain}`}>Finalize the auction</Link></p>
    case 4: return <p>Reveal.<br /><Link to={`/unseal?domain=${domain}`}>Reveal your bid</Link></p>
    case 5: return <p>Owned.<br /><Link to={`/admin?domain=${domain}`}>Admin the domain</Link></p>
    default: return null
  }
}

class DomainStateComponent extends Component {
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
    const { domain, auctionState, auctionStateLoading } = this.props;

    const displayState = getDisplayState(domain, auctionStateLoading, auctionState);

    return (
      <Card>
        <Card.Body>
          <Card.Title>
            <h2>{domain}</h2>
          </Card.Title>
          <Card.Text>
            {displayState}
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

export default DomainStateComponent;
