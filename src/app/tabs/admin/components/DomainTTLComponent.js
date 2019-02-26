import React, { Component } from 'react';

class DomainTTLComponent extends Component {
  render () {
    return (
      <label>TTL: {this.props.ttlLoading ? '...' : this.props.ttl}</label>
    )
  }
}

export default DomainTTLComponent;
