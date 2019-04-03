import React, { Component } from 'react';
import { TabWithSearchComponent } from '../../../components';
import { Button } from 'react-bootstrap';

class StartAuctionComponent extends Component {
  render () {
    const { domain, startAuction } = this.props;

    return(
      <TabWithSearchComponent>
        <h2>Register {domain}</h2>
        <Button onClick={() => startAuction(domain)}>Start auction</Button>
      </TabWithSearchComponent>
    );
  }
}

export default StartAuctionComponent;
