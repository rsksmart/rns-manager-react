import React, { Component } from 'react';
import { TabWithSearchComponent } from '../../../components';
import { Button } from 'react-bootstrap';

class StartAuctionComponent extends Component {
  render () {
    const { domain, startAuction } = this.props;

    return(
      <TabWithSearchComponent>
        <h2>start an auction for <b>{domain}</b></h2>
        <Button onClick={() => startAuction(domain)}>start auction</Button>
      </TabWithSearchComponent>
    );
  }
}

export default StartAuctionComponent;
