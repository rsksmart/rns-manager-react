import { PublicResolverFieldComponent } from '../components';
import { connect } from 'react-redux';
import { parse } from 'query-string';
import { getContent } from '../operations';

const mapStateToProps = state => ({
  domain: parse(state.router.location.search).domain,
  getting: state.publicResolver.addr.getting,
  value: state.publicResolver.addr.value,
  error: state.publicResolver.addr.error
});

const mapDispatchToProps = dispatch => ({
  getValue: domain => dispatch(getContent(domain))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PublicResolverFieldComponent);
