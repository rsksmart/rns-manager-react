import { connect } from 'react-redux';
import { getAuctionState } from '../operations';
import { parse } from 'query-string';
import { DomainStateComponent } from '../components';
import { showModal } from '../../../auth/actions'
import { start } from '../../../auth/operations';
import { push } from 'connected-react-router';

const mapStateToProps = state => ({
  domain: parse(state.router.location.search).domain || '',
  auctionStateLoading: state.search.auctionStateLoading,
  auctionState: state.search.auctionState,
  authDomain: state.auth.isOwner ? state.auth.name : null,
  viewMyCrypto: state.user.viewMyCrypto
});

const mapDispatchToProps = dispatch => ({
  getState: domain => dispatch(getAuctionState(domain)),
  search: domain => dispatch(push(`/search?domain=${domain}`)),
  login: domain => {
    dispatch(showModal(domain))
    dispatch(start())
  }
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  getState: stateProps.viewMyCrypto ? null : dispatchProps.getState
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(DomainStateComponent);
