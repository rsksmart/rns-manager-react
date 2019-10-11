import { connect } from 'react-redux';
import { checkIfSubdomain, migrateToFifsRegistrar } from '../operations';
import { FIFSMigrationComponent } from '../components';

const mapStateToProps = state => ({
  address: state.auth.address,
  name: state.auth.name,
  ...state.admin.fifsMigration,
});

const mapDispatchToProps = dispatch => ({
  checkIfSubdomain: name => dispatch(checkIfSubdomain(name)),
  migrate: address => dispatch(migrateToFifsRegistrar(address)),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  checkIfSubdomain: () => dispatchProps.checkIfSubdomain(stateProps.name),
  migrate: () => dispatchProps.migrate(stateProps.address),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(FIFSMigrationComponent);
