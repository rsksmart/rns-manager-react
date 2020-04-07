import { connect } from 'react-redux';
import SearchResultsComponent from '../components/SearchResultsComponent';

const mapStateToProps = state => ({
  domain: state.search.domain,
  available: !state.search.owned,
  blocked: state.search.blocked,
  isSearching: state.search.domainStateLoading,
  rifCost: state.search.rifCost,
});

export default connect(
  mapStateToProps,
  null,
)(SearchResultsComponent);
