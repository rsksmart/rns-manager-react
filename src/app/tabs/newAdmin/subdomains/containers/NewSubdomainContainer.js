import { connect } from 'react-redux';
import { NewSubdomainComponent } from '../components';
import { newSubDomain } from '../operations';
import { errorNewSubdomainClose } from '../actions';

const mapStateToProps = state => ({
  domain: state.auth.name,
  errorMessage: state.newAdmin.subdomains.newError,
});

const mapDispatchToProps = dispatch => ({
  handleClick: (domain, subDomain, owner) => dispatch(newSubDomain(domain, subDomain, owner)),
  handleErrorClose: () => dispatch(errorNewSubdomainClose()),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  handleClick: (subDomain, owner) => dispatchProps.handleClick(
    stateProps.domain, subDomain, owner,
  ),
  handleErrorClose: () => dispatchProps.handleErrorClose(),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(NewSubdomainComponent);
