import { connect } from 'react-redux';
import SearchResultsComponent from '../components/SearchResultsComponent';

const mapDispatchToProps = dispatch => ({
  domain: 'jesse',
  available: true,
  isSearching: true,
});

export default connect(
  null,
  mapDispatchToProps,
)(SearchResultsComponent);
