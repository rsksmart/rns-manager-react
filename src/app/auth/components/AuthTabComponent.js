import React, { Component } from 'react'

class AuthTabComponent extends Component {
  render () {
    const { isLoggedIn } = this.props;

    if (!isLoggedIn) return <p>Please log in.</p>;

    return this.props.children;
  }
}

export default AuthTabComponent;
