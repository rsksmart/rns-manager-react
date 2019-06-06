import { connect } from 'react-redux';
import { DomainStateComponent } from '../components';
import { parse } from 'query-string';
import { getAuctionState } from '../operations';
import { push } from 'connected-react-router';

const mapStateToProps = state => ({
  domain: parse(state.router.location.search).domain || '',
  auctionStateLoading: state.search.auctionStateLoading,
  auctionState: state.search.auctionState,
});

const mapDispatchToProps = dispatch => ({
  getState: domain => dispatch(getAuctionState(domain)),
  search: domain => dispatch(push(`/search?domain=${domain}`))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DomainStateComponent);
