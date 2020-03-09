import { connect } from 'react-redux';
import { DomainInfoComponent } from '../components';

const mapStateToProps = state => ({
  domain: state.auth.name,
});

const mapDispatchToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DomainInfoComponent);
