import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class StartButtonComponent extends Component {
  render () {
    const { open, isOwner, domain } = this.props;

    return (
      domain && isOwner ? domain : <Button onClick={open}>Start</Button>
    )
  }
}

export default StartButtonComponent;
