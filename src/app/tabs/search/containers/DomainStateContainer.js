import { connect } from 'react-redux';
import { getAuctionState } from '../operations';
import { parse } from 'query-string';
import { push } from 'connected-react-router';
import { DomainStateComponent } from '../components';

const mapStateToProps = state => ({
  auctionStateLoading: state.search.auctionStateLoading,
  auctionState: state.search.auctionState,
  domain: parse(state.router.location.search).domain
});

const mapDispatchToProps = dispatch => ({
  getState: (domain) => dispatch(getAuctionState(domain)),
  onSearch: (domain) => dispatch(push(`/search?domain=${domain}`))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DomainStateComponent);
