import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class StartAuctionComponent extends Component {
  render () {
    const { domain, startAuction } = this.props;

    return(
      <React.Fragment>
        <h2>Register {domain}</h2>
        <Button onClick={() => startAuction(domain)}>Start auction</Button>
      </React.Fragment>
    );
  }
}

export default StartAuctionComponent;
