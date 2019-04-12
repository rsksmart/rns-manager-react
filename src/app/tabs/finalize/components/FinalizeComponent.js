import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { TabWithSearchComponent } from '../../../components';

class FinalizeComponent extends Component {
  render () {
    const { domain, finalize, loading } = this.props;

    return (
      <TabWithSearchComponent>
        <h2>finalize auction for <b>{domain}</b></h2>
        <Button onClick={() => finalize(domain)}>Finalize auction</Button>
        {loading && '...'}
      </TabWithSearchComponent>
    )
  }
}

export default FinalizeComponent;
