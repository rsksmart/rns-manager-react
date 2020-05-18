import { connect } from 'react-redux';
import { MigrateToMultiResolverComponent } from '../components';
import { definitiveResolver } from '../../../../adapters/configAdapter';
import { setDomainResolver, setDomainResolverAndMigrate } from '../../resolver/operations';
import { closeMessage } from '../../resolver/actions';

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
  handleClick: (domain, migrateAddresses, chainAddresses, understandWarning) => {
    if (!migrateAddresses) {
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
  ),
  handleCloseClick: () => dispatchProps.closeErrorMessage(),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(MigrateToMultiResolverComponent);
