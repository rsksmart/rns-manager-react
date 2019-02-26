import React, { Component } from 'react';

class DomainResolverComponent extends Component {
  render () {
    return (
      <label>Resolver: {this.props.resolverLoading ? '...' : this.props.resolver}</label>
    )
  }
}

export default DomainResolverComponent;
