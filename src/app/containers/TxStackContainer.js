import { TxStackComponent } from '../components';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  transactions: state.response.transactions
});

export default connect(mapStateToProps)(TxStackComponent);
