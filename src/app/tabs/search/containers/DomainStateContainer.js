import { connect } from 'react-redux';
import { DomainStateComponent } from '../components';
import { parse } from 'query-string';
import { showModal } from '../../../auth/actions'
import { getAuctionState } from '../operations';
import { start } from '../../../auth/operations';
import { push } from 'connected-react-router';

const mapStateToProps = state => ({
  domain: parse(state.router.location.search).domain || '',
  auctionStateLoading: state.search.auctionStateLoading,
  auctionState: state.search.auctionState,
  authDomain: state.auth.isOwner ? state.auth.name : null
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
