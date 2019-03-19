import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class FinalizeComponent extends Component {
  render () {
    const { domain, finalize, loading } = this.props;

    return (
      <React.Fragment>
        <h2>Finalize auction for {domain}</h2>
        <Button onClick={() => finalize(domain)}>Finalize auction</Button>
        {loading && '...'}
      </React.Fragment>
    )
  }
}

export default FinalizeComponent;
