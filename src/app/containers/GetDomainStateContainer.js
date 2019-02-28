import { parse } from 'query-string';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { GetDomainStateComponent } from '../components';

const mapStateToProps = state => ({
  domain: parse(state.router.location.search).domain
})

const mapDispatchToProps = dispatch => ({
  getDomainState: (domain) => dispatch(push(`/search?domain=${domain}`))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GetDomainStateComponent);
