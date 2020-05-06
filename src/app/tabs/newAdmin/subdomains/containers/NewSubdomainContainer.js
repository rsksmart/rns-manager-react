import { connect } from 'react-redux';
import { NewSubdomainComponent } from '../components';
import { newSubdomain } from '../operations';
import { errorNewSubdomainClose, successNewSubdomainClose } from '../actions';

const mapStateToProps = state => ({
  domain: state.auth.name,
  address: state.auth.address,
  advancedView: state.newAdmin.view.advancedView,
  errorMessage: state.newAdmin.subdomains.newError,
  newRequesting: state.newAdmin.subdomains.newRequesting,
  newWaiting: state.newAdmin.subdomains.newWaiting,
  confirmedTx: state.newAdmin.subdomains.confirmedTx,
  subdomains: state.newAdmin.subdomains.subdomains,
  chainId: state.auth.network,
});

const mapDispatchToProps = dispatch => ({
  handleClick: (domain, subDomain, owner, subdomains, setupResolution) => dispatch(newSubdomain(
    domain, subDomain, owner, subdomains, setupResolution,
  )),
  handleErrorClose: () => dispatch(errorNewSubdomainClose()),
  handleSuccessClose: () => dispatch(successNewSubdomainClose()),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  handleClick: (subDomain, owner, setupResolution) => dispatchProps.handleClick(
    stateProps.domain, subDomain, owner, stateProps.subdomains, setupResolution,
  ),
  handleErrorClose: () => dispatchProps.handleErrorClose(),
  handleSuccessClose: () => dispatchProps.handleSuccessClose(),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(NewSubdomainComponent);
