import { connect } from 'react-redux';
import { multiChainResolver } from '../../../../adapters/configAdapter';

import AddressInputContainer from '../../../../components/AddressInputComponent';
import { setDomainResolver } from '../operations';
import { closeMessage } from '../actions';

const getSuggestions = (resolver) => {
  const resolvers = [
    {
      name: 'Default Resolver',
      value: multiChainResolver,
    },
  ];

  return resolvers.filter(item => item.value.toLowerCase() !== resolver.toLowerCase());
};

const mapStateToProps = state => ({
  domain: state.auth.name,
  validation: true,
  validationChainId: state.auth.network,
  allowDelete: false,
  value: state.newAdmin.resolver.resolverAddr,
  isWaiting: state.newAdmin.resolver.isEditing,
  successTx: state.newAdmin.resolver.successTx,
  isError: state.newAdmin.resolver.errorMessage !== '',
  errorMessage: state.newAdmin.resolver.errorMessage,
  isSuccess: state.newAdmin.resolver.successTx !== '',
  address: state.newAdmin.resolver.successTx,
  suggestions: getSuggestions(state.newAdmin.resolver.resolverAddr),
});

const mapDispatchToProps = dispatch => ({
  handleSubmit: (domain, value) => dispatch(setDomainResolver(domain, value)),
  handleErrorClose: () => dispatch(closeMessage()),
  handleSuccessClose: () => dispatch(closeMessage()),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  handleSubmit: value => dispatchProps.handleSubmit(stateProps.domain, value),
  reset: stateProps.isSuccess,
  strings: {
    ...ownProps.strings,
    error_message: stateProps.errorMessage,
  },
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(AddressInputContainer);
