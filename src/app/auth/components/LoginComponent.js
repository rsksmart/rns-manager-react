import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class LoginComponent extends Component {
  render () {
    const { enable, enabling, address, authenticating, domain, openAuth } = this.props;

    if (enabling || authenticating) return '...';
    else if (!address && !domain) return <Button onClick={enable}>Start</Button>;
    else if (address && !domain) return <Button onClick={openAuth}>Start</Button>;
    else return domain;
  }
}

export default LoginComponent;
