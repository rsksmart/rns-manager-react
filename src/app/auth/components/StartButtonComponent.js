import React, { Component } from 'react';

class StartButtonComponent extends Component {
  render () {
    const { open, isOwner, domain } = this.props;

    return (
      domain && isOwner ? <button className='btn btn-outline-primary my-2 my-sm-0 ml-1' disabled>{domain}</button> : <button className='btn btn-outline-primary my-2 my-sm-0 ml-1' onClick={open}>Start</button>
    )
  }
}

export default StartButtonComponent;
