import { parse } from 'query-string';
import { connect } from 'react-redux';
import { RegistrarComponent } from '../components';

const mapStateToProps = state => ({
  domain: parse(state.router.location.search).domain,
});

const mapDispatchToProps = () => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegistrarComponent);
