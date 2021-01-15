import { connect } from 'react-redux';
import { MigrateToMultiResolverComponent } from '../components';
import { definitiveResolver } from '../../../../adapters/configAdapter';
import { setDomainResolver, setDomainResolverAndMigrate } from '../../resolver/operations';
import { closeMessage, clearMigrateContent } from '../../resolver/actions';
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
  errorMessage: state.newAdmin.resolver.migrating.errorMessage,
  chainAddresses: state.newAdmin.addresses.chainAddresses,
  isMigrating: state.newAdmin.resolver.migrating.isMigrating,
  decodingErrors: state.newAdmin.resolver.migrating.errors,
  contentBytes: state.newAdmin.resolver.content.CONTENT_BYTES,
  resolverName: state.newAdmin.resolver.resolverName,
  isWalletConnect: state.auth.isWalletConnect,
});

const mapDispatchToProps = dispatch => ({
  handleClick: (
    domain, migrateAddresses, chainAddresses, contentBytes, understandWarning,
  ) => {
    if (!migrateAddresses) {
      dispatch(setDomainResolver(domain, definitiveResolver));
    } else {
      dispatch(setDomainResolverAndMigrate(
        domain, chainAddresses, contentBytes, understandWarning,
      ));
    }
  },
  closeErrorMessage: () => dispatch(closeMessage()),
  clearMigrateWarning: () => dispatch(clearMigrateContent()),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  handleClick: (migrateAddresses, understandWarning) => dispatchProps.handleClick(
    stateProps.domain, migrateAddresses, stateProps.chainAddresses, stateProps.contentBytes,
    understandWarning,
  ),
  handleCloseClick: () => dispatchProps.closeErrorMessage(),
  hasAddresses: hasAddresses(stateProps.chainAddresses),
  clearMigrateWarning: () => dispatchProps.clearMigrateWarning(),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(MigrateToMultiResolverComponent);
