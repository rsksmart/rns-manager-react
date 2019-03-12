import { connect } from 'react-redux';
import { getAuctionState } from '../operations';
import { parse } from 'query-string';
import { DomainStateComponent } from '../components';

const mapStateToProps = state => ({
  domain: parse(state.router.location.search).domain,
  auctionStateLoading: state.search.auctionStateLoading,
  auctionState: state.search.auctionState
});

const mapDispatchToProps = dispatch => ({
  getState: (domain) => dispatch(getAuctionState(domain)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DomainStateComponent);
