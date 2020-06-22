import { connect } from 'react-redux';
import Web3 from 'web3';
import cbor from 'cbor';
import { inflateSync } from 'react-zlib-js';

import { ViewContractAbiComponent } from '../components';
import { setContent } from '../operations';
import { closeSetMessage } from '../actions';
import { CONTRACT_ABI } from '../types';

/**
 * Helper function to get prettyJSON from values returned from the blockchain.
 * Returns the first value it finds, else it returns an empty string.
 * @param {array} value array from redux with id and result.
 */
const getPrettyJSON = (value) => {
  const uncompressed = value.filter(i => i.id === 1)[0];
  if (uncompressed && uncompressed.result) {
    try {
      return JSON.stringify(JSON.parse(Web3.utils.toAscii(uncompressed.result)), null, 2);
    } catch (e) {
      return '';
    }
  }

  // try zlib
  const zlibValue = value.filter(i => i.id === 2)[0];
  if (zlibValue && zlibValue.result) {
    try {
      const uncompressedZlib = inflateSync(Buffer.from(zlibValue.result.slice(2), 'hex'));
      const currentAbi = JSON.parse(Web3.utils.toAscii(`0x${uncompressedZlib.toString('hex')}`));
      return JSON.stringify(currentAbi, null, 2);
    } catch (e) {
      return '';
    }
  }

  // try cbor value
  const cborValue = value.filter(i => i.id === 4)[0];
  if (cborValue && cborValue.result) {
    const result = cbor.decodeAllSync(Buffer.from(cborValue.result.slice(2), 'hex'))[0];
    if (result) {
      return JSON.stringify(JSON.parse(result), null, 2);
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
  prettyJson: getPrettyJSON(state.newAdmin.resolver.content.CONTRACT_ABI.value),
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
