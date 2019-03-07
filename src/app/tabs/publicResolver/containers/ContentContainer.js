import { PublicResolverFieldComponent } from '../components';
import { connect } from 'react-redux';
import { parse } from 'query-string';
import { changeViewContent } from '../actions';
import { getContent, setContent } from '../operations';

const mapStateToProps = state => ({
  domain: parse(state.router.location.search).domain,
  getting: state.publicResolver.content.getting,
  value: state.publicResolver.content.value,
  errorGet: state.publicResolver.content.error,
  editOpen: state.publicResolver.content.editOpen,
  editting: state.publicResolver.content.editting,
  responseSet: state.publicResolver.content.responseSet,
  setHasError: state.publicResolver.content.setHasError
});

const mapDispatchToProps = dispatch => ({
  getValue: domain => dispatch(getContent(domain)),
  changeEdit: () => dispatch(changeViewContent()),
  setValue: (domain, value) => dispatch(setContent(domain, value))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PublicResolverFieldComponent);
