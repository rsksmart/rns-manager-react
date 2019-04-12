import { connect } from 'react-redux';
import { getAuctionState } from '../operations';
import { parse } from 'query-string';
import { DomainStateComponent } from '../components';
import { showModal } from '../../../auth/actions'
import { start } from '../../../auth/operations';
import { push } from 'connected-react-router';

const mapStateToProps = state => ({
  domain: parse(state.router.location.search).domain,
  auctionStateLoading: state.search.auctionStateLoading,
  auctionState: state.search.auctionState,
  authDomain: state.auth.isOwner ? state.auth.domain : null
});

const mapDispatchToProps = dispatch => ({
  getState: domain => dispatch(getAuctionState(domain)),
  search: domain => dispatch(push(`/search?domain=${domain}`)),
  login: domain => {
    dispatch(showModal(domain))
    dispatch(start())
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DomainStateComponent);
