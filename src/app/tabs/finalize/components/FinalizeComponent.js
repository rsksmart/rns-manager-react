import React, { Component } from 'react';
import { Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class FinalizeComponent extends Component {
  render () {
    const { domain, finalize, loading, response } = this.props;

    return (
      <React.Fragment>
        <h2>Finalize auction for {domain}</h2>
        <Button onClick={() => finalize(domain)}>Finalize auction</Button>
        {loading && '...'}
        {response &&
          <Alert variant={response.variant}>
            {response.message}<br />
            {response.variant === 'success' && <Link to={`/admin?domain=${domain}`}>Admin your domain</Link>}
          </Alert>
        }
      </React.Fragment>
    )
  }
}

export default FinalizeComponent;
