import { connect } from 'react-redux';
import { RenewDomainComponent } from '../components';

const mapStateToProps = state => ({
  isRenewOpen: state.newAdmin.domainInfo.isRenewOpen,
});

const mapDispatchToProps = () => ({
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(RenewDomainComponent);
