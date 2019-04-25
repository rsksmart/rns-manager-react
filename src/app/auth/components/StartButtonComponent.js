import React, { Component } from 'react';

class StartButtonComponent extends Component {
  render () {
    const { open, user, isOwner, domain, address } = this.props;

    return (
      !address ?
      <button className='btn btn-outline-primary my-2 my-sm-0 ml-1' onClick={open}>start</button> :
      domain && isOwner ? <button className='btn btn-outline-primary my-2 my-sm-0 ml-1' onClick={user}>{domain}</button> :
      <button className='btn btn-outline-primary my-2 my-sm-0 ml-1' onClick={open}>log in</button>
    )
  }
}

export default StartButtonComponent;
