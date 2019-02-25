import React from 'react';
import { connect } from 'react-redux';
import { resolveAddress } from '../operations';

const mapStateToProps = state => ({
  address: state.address,
  resolveAddressLoading: state.resolveAddressLoading
});

const ResolveAddressContainer = ({
  dispatch,
  address,
  resolveAddressLoading
}) => {
  let input;

  return (
    <form onSubmit={e => {
      e.preventDefault();
      dispatch(resolveAddress(input.value));
    }}>
      <input ref={node => (input = node)} />
      <p>{resolveAddressLoading ? 'Loading...' : address}</p>
    </form>
  );
}

export default connect(mapStateToProps)(ResolveAddressContainer);
