import { connect } from 'react-redux';
import SearchResultsComponent from '../components/SearchResultsComponent';
import { clearDomainState } from '../../search/actions';
import { history } from '../../../../configureStore';

const mapStateToProps = state => ({
  domain: state.search.domain,
  available: !state.search.owned,
  blocked: state.search.blocked,
  isSearching: state.search.domainStateLoading,
  rifCost: state.search.rifCost,
});

const mapDispatchToProps = dispatch => ({
  handleClick: (domain) => {
    dispatch(clearDomainState());
    history.push(`/registrar?domain=${domain}`);
  },
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  handleClick: () => dispatchProps.handleClick(stateProps.domain),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(SearchResultsComponent);
