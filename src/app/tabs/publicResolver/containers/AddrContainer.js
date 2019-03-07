import { PublicResolverFieldComponent } from '../components';
import { connect } from 'react-redux';
import { parse } from 'query-string';
import { changeViewAddr } from '../actions';
import { getAddr, setAddr } from '../operations';

const mapStateToProps = state => ({
  domain: parse(state.router.location.search).domain,
  getting: state.publicResolver.addr.getting,
  value: state.publicResolver.addr.value,
  errorGet: state.publicResolver.addr.error,
  editOpen: state.publicResolver.addr.editOpen,
  editting: state.publicResolver.addr.editting,
  responseSet: state.publicResolver.addr.responseSet,
  setHasError: state.publicResolver.addr.setHasError
});

const mapDispatchToProps = dispatch => ({
  getValue: domain => dispatch(getAddr(domain)),
  changeEdit: () => dispatch(changeViewAddr()),
  setValue: (domain, value) => dispatch(setAddr(domain, value))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PublicResolverFieldComponent);
