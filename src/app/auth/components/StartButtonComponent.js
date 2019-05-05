import React, { Component } from 'react';
import { multilanguage } from 'redux-multilanguage';

class StartButtonComponent extends Component {
  render () {
    const { strings, open, user, isOwner, domain, address, viewMyCrypto } = this.props;

    return (
      viewMyCrypto ?
      <button className='btn btn-outline-primary my-2 my-sm-0 ml-1' onClick={open}>{strings.switch_to_metamask}</button> :
      !address ?
      <button className='btn btn-outline-primary my-2 my-sm-0 ml-1' onClick={open}>{strings.start}</button> :
      domain && isOwner ? <button className='btn btn-outline-primary my-2 my-sm-0 ml-1' onClick={user}>{domain}</button> :
      <button className='btn btn-outline-primary my-2 my-sm-0 ml-1' onClick={open}>{strings.log_in}</button>
    )
  }
}

export default multilanguage(StartButtonComponent);
