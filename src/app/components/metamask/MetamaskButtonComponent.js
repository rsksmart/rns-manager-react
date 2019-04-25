import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class MetamaskButtonComponent extends Component {
  render () {
    const { startAndClick, enabled, onClick, ...props } = this.props;

    return (
      <Button {...props} onClick={
        enabled ? onClick : startAndClick
      } />
    );
  }
}

export default MetamaskButtonComponent;
