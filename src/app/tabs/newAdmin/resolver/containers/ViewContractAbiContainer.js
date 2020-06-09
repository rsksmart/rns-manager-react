import { connect } from 'react-redux';
import Web3 from 'web3';

import { ViewContractAbiComponent } from '../components';
import { setContent } from '../operations';
import { closeSetMessage } from '../actions';
import { CONTRACT_ABI } from '../types';

const getJson = (value) => {
  const uncompressed = value.filter(i => i.id === 1)[0];
  if (uncompressed && uncompressed.result) {
    try {
      return JSON.stringify(JSON.parse(Web3.utils.toAscii(uncompressed.result)), null, 2);
    } catch (e) {
      return '';
    }
  }
  return '';
};

const mapStateToProps = state => ({
  domain: state.auth.name,
  resolverAddress: state.newAdmin.resolver.resolverAddr,
  isWaiting: state.newAdmin.resolver.content.CONTRACT_ABI.isWaiting,
  errorMessage: state.newAdmin.resolver.content.CONTRACT_ABI.errorMessage,
  successTx: state.newAdmin.resolver.content.CONTRACT_ABI.successTx,
  prettyJson: getJson(state.newAdmin.resolver.content.CONTRACT_ABI.value),
});

const mapDispatchToProps = dispatch => ({
  handleClick: (resolverAddress, domain, data) => {
    dispatch(setContent(CONTRACT_ABI, resolverAddress, domain, data));
  },
  handleCloseClick: () => dispatch(closeSetMessage(CONTRACT_ABI)),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  handleClick: data => dispatchProps.handleClick(
    stateProps.resolverAddress, stateProps.domain, { ...data, isEditing: true },
  ),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(ViewContractAbiComponent);
