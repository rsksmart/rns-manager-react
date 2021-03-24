import { connect } from 'react-redux';
import { networkSelector } from '../../selectors';
import { start } from '../../auth/operations';
import ErrorTabComponent from './ErrorTabComponent';

const mapStateToProps = state => ({
  hasWeb3Provider: state.auth.hasWeb3Provider,
  hasContracts: state.auth.hasContracts,
  networkMatch: state.auth.networkMatch,
  walletUnlocked: state.auth.walletUnlocked,
  walletNetwork: networkSelector(state.auth.network),
  envNetwork: networkSelector(process.env.REACT_APP_ENVIRONMENT_ID),
});

const mapDispatchToProps = dispatch => ({
  rLoginConnect: () => dispatch(start()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ErrorTabComponent);
