import { connect } from 'react-redux';
import { NewSubdomainComponent } from '../components';
import { newSubDomain } from '../operations';
import { errorNewSubdomainClose, successNewSubdomainClose } from '../actions';

const mapStateToProps = state => ({
  domain: state.auth.name,
  errorMessage: state.newAdmin.subdomains.newError,
  newRequesting: state.newAdmin.subdomains.newRequesting,
  newWaiting: state.newAdmin.subdomains.newWaiting,
  confirmedTx: state.newAdmin.subdomains.confirmedTx,
  subdomains: state.newAdmin.subdomains.subdomains,
});

const mapDispatchToProps = dispatch => ({
  handleClick: (domain, subDomain, owner, subdomains) => dispatch(newSubDomain(
    domain, subDomain, owner, subdomains,
  )),
  handleErrorClose: () => dispatch(errorNewSubdomainClose()),
  handleSuccessClose: () => dispatch(successNewSubdomainClose()),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  handleClick: (subDomain, owner) => dispatchProps.handleClick(
    stateProps.domain, subDomain, owner, stateProps.subdomains,
  ),
  handleErrorClose: () => dispatchProps.handleErrorClose(),
  handleSuccessClose: () => dispatchProps.handleSuccessClose(),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(NewSubdomainComponent);
