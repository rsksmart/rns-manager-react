import React from 'react';
import { connect } from 'react-redux';
import { getAuctionState } from '../operations';
import { Form, InputGroup, FormControl, Button } from 'react-bootstrap';

const mapStateToProps = state => ({
  auctionState: state.rns.auctionState,
  auctionStateLoading: state.rns.auctionStateLoading
});

const mapDispatchToProps = dispatch => ({
  onGetState: (domain) => dispatch(getAuctionState(domain))
});

const DomainStateContainer = ({
  onGetState,
  auctionState,
  auctionStateLoading
}) => {
  let input;

  return (
    <Form onSubmit={e => {
      e.preventDefault();
      onGetState(input.value);
    }}>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="mydomain.rsk"
          aria-label="mydomain.rsk"
          aria-describedby="domain"
          ref={node => (input = node)}
        />
        <InputGroup.Append>
          <Button type="submit" variant="outline-secondary">Search domains</Button>
        </InputGroup.Append>
      </InputGroup>
      <p>{auctionStateLoading ? 'Loading...' : auctionState}</p>
    </Form>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DomainStateContainer);
