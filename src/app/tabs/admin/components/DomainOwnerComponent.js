import React, { Component } from 'react';

class DomainOwnerComponent extends Component {
  render () {
    return (
      <label>Owner: {this.props.ownerLoading ? '...' : this.props.owner}</label>
    )
  }
}

export default DomainOwnerComponent;
