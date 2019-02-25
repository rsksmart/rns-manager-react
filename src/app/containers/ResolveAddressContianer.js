import React from 'react';
import { connect } from 'react-redux';
import { resolveAddress } from '../operations';
import { Form, InputGroup, FormControl, Button } from 'react-bootstrap';

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
    <Form onSubmit={e => {
      e.preventDefault();
      dispatch(resolveAddress(input.value));
    }}>
      <InputGroup>
        <FormControl ref={node => (input = node)} />
        <InputGroup.Append>
          <Button type="submit">Resolve</Button>
        </InputGroup.Append>
      </InputGroup>
      <p>{resolveAddressLoading ? 'Loading...' : address}</p>
    </Form>
  );
}

export default connect(mapStateToProps)(ResolveAddressContainer);
