import { connect } from 'react-redux';
import { AddressInputComponent } from '../../../../components';

const mapStateToProps = (state, ownProps) => ({
  domain: state.auth.domain,
});

const mapDispatchToProps = dispatch => ({
  handleSubmit: value => console.log('submit!', value),
  handleErrorClose: () => console.log('handleErrorClose'),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  handleSubmit: value => dispatchProps.handleSubmit(value),
  handleErrorClose: () => dispatchProps.handleErrorClose(),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(AddressInputComponent);
