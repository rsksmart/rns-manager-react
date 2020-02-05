import { connect } from 'react-redux';
import { IndicatorLight } from '../components';

const mapStateToProps = state => ({
  networkMatch: state.auth.networkMatch,
  network: process.env.REACT_APP_ENVIRONMENT_ID,
});

export default connect(mapStateToProps)(IndicatorLight);
