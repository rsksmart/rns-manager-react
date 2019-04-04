import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { TabWithSearchComponent } from '../../../components';

function getDisplayState (domain, auctionStateLoading, state) {
  if (!domain) return 'Search for a domain.';
  if (auctionStateLoading) return 'Loading...';

  switch(state) {
    case 0: return <Card.Text>Open.<br /><Link to={`/start?domain=${domain}`}>Register the domain</Link></Card.Text>
    case 1: return <Card.Text>Auction.<br /><Link to={`/bid?domain=${domain}`}>Bid in the domain auction</Link></Card.Text>
    case 2: return <Card.Text>Finalize.<br /><Link to={`/finalize?domain=${domain}`}>Finalize the auction</Link></Card.Text>
    case 4: return <Card.Text>Reveal.<br /><Link to={`/unseal?domain=${domain}`}>Reveal your bid</Link></Card.Text>
    case 5: return <Card.Text>Owned.<br /><Link to={`/admin?domain=${domain}`}>Admin the domain</Link></Card.Text>
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
      <TabWithSearchComponent>
        <Card>
          <Card.Body>
            <Card.Title>
              <h2>{domain}</h2>
            </Card.Title>
            {displayState}
          </Card.Body>
        </Card>
      </TabWithSearchComponent>
    );
  }
}

export default DomainStateComponent;
