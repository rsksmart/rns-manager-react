import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { TabWithSearchComponent } from '../../../components';
import { MetamaskButtonContainer } from '../../../containers';
import { MyCryptoModal } from './MyCryptoModal';
import { multilanguage } from 'redux-multilanguage';

class FinalizeComponent extends Component {
  constructor (props) {
    super(props);

    this.state = { showMyCrypto: false };

    this.changeShowMyCrypto = this.changeShowMyCrypto.bind(this);
  }

  changeShowMyCrypto () {
    this.setState(state => ({ showMyCrypto: !state.showMyCrypto }));
  }
  render () {
    const { strings, domain, finalize, loading, viewMyCrypto } = this.props;
    const { showMyCrypto } = this.state;

    return (
      <TabWithSearchComponent>
        <h2>{strings.finalize_auction_for} <code>{domain}</code></h2>
        {
          viewMyCrypto ?
          <Button onClick={this.changeShowMyCrypto}>{strings.finalize_auction}</Button> :
          <MetamaskButtonContainer onClick={() => finalize(domain)}>{strings.finalize_auction}</MetamaskButtonContainer>
        }
        {viewMyCrypto && <MyCryptoModal changeShowMyCrypto={this.changeShowMyCrypto} showMyCrypto={showMyCrypto} name={domain} />}
        {loading && '...'}
      </TabWithSearchComponent>
    )
  }
}

export default multilanguage(FinalizeComponent);
