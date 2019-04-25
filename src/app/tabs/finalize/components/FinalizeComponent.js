import React, { Component } from 'react';
import { TabWithSearchComponent } from '../../../components';
import { MetamaskButtonContainer } from '../../../containers';

class FinalizeComponent extends Component {
  render () {
    const { domain, finalize, loading } = this.props;

    return (
      <TabWithSearchComponent>
        <h2>finalize auction for <b>{domain}</b></h2>
        <MetamaskButtonContainer onClick={() => finalize(domain)}>Finalize auction</MetamaskButtonContainer>
        {loading && '...'}
      </TabWithSearchComponent>
    )
  }
}

export default FinalizeComponent;
