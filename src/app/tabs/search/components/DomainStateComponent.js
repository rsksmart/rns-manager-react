import React, { Component } from 'react';
import { Form, InputGroup, Button, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function getDisplayState (domain, auctionStateLoading, state) {
  if (!domain) return 'Search for a domain.';
  if (auctionStateLoading) return 'Loading...';

  switch(state) {
    case 0: return <p>Open.<br /><Link to={`/start?domain=${domain}`}>Register the domain</Link></p>
    case 1: return <p>Auction.<br /><Link to={`/bid?domain=${domain}`}>Bid in the domain auction</Link></p>
    case 2: return <p>Owned.<br /><Link to={`/admin?domain=${domain}`}>Admin the domain</Link></p>
    case 4: return <p>Reveal.<br /><Link to={`/unseal?domain=${domain}`}>Reveal your bid</Link></p>
    case 5: return <p>Finalize.<br /><Link to={`/finalize?domain=${domain}`}>Finalize the auction</Link></p>
    default: return null
  }
}

class DomainStateComponent extends Component {
  componentDidMount() {
    const { domain, getState } = this.props;
    getState(domain);
  }

  render () {
    const { domain, onSearch, getState, auctionState, auctionStateLoading } = this.props;

    const displayState = getDisplayState(domain,auctionStateLoading, auctionState);

    let input;

    return (
      <Form onSubmit={e => {
        e.preventDefault();
        onSearch(input.value);
        getState(input.value);
      }}>
        <InputGroup className="mb-3">
          <FormControl ref={node => (input = node)} defaultValue={domain} />
          <InputGroup.Append>
            <Button type="submit">Search</Button>
          </InputGroup.Append>
        </InputGroup>
        {displayState}
      </Form>
    );
  }
}

export default DomainStateComponent;
