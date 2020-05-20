import { connect } from 'react-redux';
import { MigrateToMultiResolverComponent } from '../components';
import { definitiveResolver } from '../../../../adapters/configAdapter';
import { setDomainResolver, setDomainResolverAndMigrate } from '../../resolver/operations';
import { closeMessage } from '../../resolver/actions';
import { EMPTY_ADDRESS } from '../../types';

const hasAddresses = (chainAddresses) => {
  let result = false;
  Object.entries(chainAddresses).map((chainAddress) => {
    if (chainAddress[1].address !== '' && chainAddress[1].address !== EMPTY_ADDRESS) {
      result = true;
    }
    return false;
  });
  return result;
};

const mapStateToProps = state => ({
  domain: state.auth.name,
  isWaiting: state.newAdmin.resolver.isWaiting,
  isEditing: state.newAdmin.resolver.isEditing,
  errorMessage: state.newAdmin.resolver.errorMessage,
  chainAddresses: state.newAdmin.addresses.chainAddresses,
  isMigrating: state.newAdmin.resolver.migrating.isMigrating,
  decodingErrors: state.newAdmin.resolver.migrating.errors,
});

const mapDispatchToProps = dispatch => ({
  handleClick: (domain, migrateAddresses, chainAddresses, understandWarning, hasMigration) => {
    if (!migrateAddresses || !hasMigration) {
      dispatch(setDomainResolver(domain, definitiveResolver));
    } else {
      dispatch(setDomainResolverAndMigrate(domain, chainAddresses, understandWarning));
    }
  },
  closeErrorMessage: () => dispatch(closeMessage()),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  handleClick: (migrateAddresses, understandWarning) => dispatchProps.handleClick(
    stateProps.domain, migrateAddresses, stateProps.chainAddresses, understandWarning,
    hasAddresses(stateProps.chainAddresses),
  ),
  handleCloseClick: () => dispatchProps.closeErrorMessage(),
  hasAddresses: hasAddresses(stateProps.chainAddresses),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(MigrateToMultiResolverComponent);
