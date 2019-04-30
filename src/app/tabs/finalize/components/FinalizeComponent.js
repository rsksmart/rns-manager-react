import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { TabWithSearchComponent } from '../../../components';
import { MetamaskButtonContainer } from '../../../containers';
import { MyCryptoModal } from './MyCryptoModal';

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
    const { domain, finalize, loading, viewMyCrypto } = this.props;
    const { showMyCrypto } = this.state;

    return (
      <TabWithSearchComponent>
        <h2>finalize auction for <b>{domain}</b></h2>
        {
          viewMyCrypto ?
          <Button onClick={this.changeShowMyCrypto}>finalize auction</Button> :
          <MetamaskButtonContainer onClick={() => finalize(domain)}>finalize auction</MetamaskButtonContainer>
        }
        {viewMyCrypto && <MyCryptoModal changeShowMyCrypto={this.changeShowMyCrypto} showMyCrypto={showMyCrypto} name={domain} />}
        {loading && '...'}
      </TabWithSearchComponent>
    )
  }
}

export default FinalizeComponent;
