import { connect } from 'react-redux';
import { RenewDomainComponent } from '../components';
import { renewDomain } from '../operations';

const mapStateToProps = state => ({
  isRenewOpen: state.newAdmin.domainInfo.isRenewOpen,
  isRenewing: state.newAdmin.domainInfo.isRenewing,
  domain: state.auth.name.replace('.rsk', ''),
  duration: state.registrar.duration,
  rifCost: state.registrar.rifCost,
});

const mapDispatchToProps = dispatch => ({
  handleRenewClick: (domain, rifCost, duration) => dispatch(renewDomain(domain, rifCost, duration)),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  handleRenewClick: () => dispatchProps.handleRenewClick(
    stateProps.domain, stateProps.rifCost, stateProps.duration,
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(RenewDomainComponent);
