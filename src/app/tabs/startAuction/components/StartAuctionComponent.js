import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { TabWithSearchComponent } from '../../../components';
import { MetamaskButtonContainer } from '../../../containers';
import { MyCryptoModal } from './MyCryptoModal';
import { multilanguage } from 'redux-multilanguage';

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
    const { strings, domain, viewMyCrypto, startAuction } = this.props;

    return (
      <TabWithSearchComponent>
        <h2>{strings.start_an_auction_for} <code>{domain}</code></h2>
        {
          viewMyCrypto ?
          <Button onClick={this.changeShowMyCrypto}>{strings.start_auction}</Button> :
          <MetamaskButtonContainer onClick={() => startAuction(domain)}>{strings.start_auction}</MetamaskButtonContainer>
        }
        <MyCryptoModal showMyCrypto={this.state.showMyCrypto} changeShowMyCrypto={this.changeShowMyCrypto} name={domain} />
      </TabWithSearchComponent>
    );
  }
}

export default multilanguage(StartAuctionComponent);
