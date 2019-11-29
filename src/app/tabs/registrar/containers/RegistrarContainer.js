import { parse } from 'query-string';
import { connect } from 'react-redux';
import { RegistrarComponent } from '../components';
import getDomainState from '../../search/operations';


const mapStateToProps = state => ({
  domain: parse(state.router.location.search).domain,
  domainStateLoading: state.search.domainStateLoading,
  owned: state.search.owned,
  blocked: state.search.blocked,
});

const mapDispatchToProps = dispatch => ({
  getState: domain => dispatch(getDomainState(domain)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegistrarComponent);
