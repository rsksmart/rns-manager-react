import React, { Component } from 'react';
import { TabWithSearchComponent } from '../../../components';
import { MetamaskButtonContainer } from '../../../containers';

class StartAuctionComponent extends Component {
  render () {
    const { domain, startAuction } = this.props;

    return(
      <TabWithSearchComponent>
        <h2>start an auction for <b>{domain}</b></h2>
        <MetamaskButtonContainer onClick={() => startAuction(domain)}>start auction</MetamaskButtonContainer>
      </TabWithSearchComponent>
    );
  }
}

export default StartAuctionComponent;
