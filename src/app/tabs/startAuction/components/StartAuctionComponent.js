import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { TabWithSearchComponent } from '../../../components';
import { MetamaskButtonContainer } from '../../../containers';
import { MyCryptoModal } from './MyCryptoModal';

class StartAuctionComponent extends Component {
  constructor (props) {
    super(props);

    this.state = { showMyCrypto: false };

    this.changeShowMyCrypto = this.changeShowMyCrypto.bind(this);
  }

  changeShowMyCrypto () {
    this.setState({ showMyCrypto: !this.state.showMyCrypto })
  }

  render () {
    const { domain, viewMyCrypto, startAuction } = this.props;

    return (
      <TabWithSearchComponent>
        <h2>start an auction for <b>{domain}</b></h2>
        {
          viewMyCrypto ?
          <Button onClick={this.changeShowMyCrypto}>start auction</Button> :
          <MetamaskButtonContainer onClick={() => startAuction(domain)}>start auction</MetamaskButtonContainer>
        }
        <MyCryptoModal showMyCrypto={this.state.showMyCrypto} changeShowMyCrypto={this.changeShowMyCrypto} name={domain} />
      </TabWithSearchComponent>
    );
  }
}

export default StartAuctionComponent;
