import React, { Component } from 'react';
import { Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class StartAuctionComponent extends Component {
  render () {
    const { domain, response, startAuction } = this.props;

    return(
      <React.Fragment>
        <h2>Register {domain}</h2>
        <Button onClick={() => startAuction(domain)}>Start auction</Button>
        {response &&
          <Alert key='startAuction' variant={response.variant}>
            {response.message}<br />
            {response.variant === 'success' && <Link to={`/bid?domain=${domain}`}>Bid</Link>}
          </Alert>
        }
      </React.Fragment>
    )
  }
}

export default StartAuctionComponent;
