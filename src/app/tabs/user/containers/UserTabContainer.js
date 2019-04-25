import { UserTabComponent } from '../components';
import { connect } from 'react-redux';
import { networkSelector, toChecksumAddress } from '../../../selectors';

const mapStateToProps = state => ({
  name: state.auth.name,
  network: networkSelector(state.auth.network),
  address: state.auth.address && toChecksumAddress(state)(state.auth.address)
});

export default connect(mapStateToProps)(UserTabComponent);
