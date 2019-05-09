import { FieldComponent } from '../components';
import { connect } from 'react-redux';
import { valueTypes } from '../types';
import { validateAddress, validatePositiveNumber, validateBytes32 } from '../validations';
import { toChecksumAddress } from '../selectors';
import { parse } from 'query-string';

const mapStateToProps = (state, ownProps) => {
  const { getField, valueType } = ownProps;
  const { getting, value, editOpen, editting } = getField(state);
  const { name, network } = state.auth;
  const { action, defaultValue } = parse(state.router.location.search);

  const displayValue = valueType === valueTypes.ADDRESS ? toChecksumAddress(state)(value) :
    valueType === valueTypes.POSITIVE_NUMBER ? value && value.toNumber() : value;

  const validate =
    valueType === valueTypes.ADDRESS ? address => validateAddress(address, network) :
      valueType === valueTypes.POSITIVE_NUMBER ? number => validatePositiveNumber(number) :
        valueType === valueTypes.BYTES32 ? bytes => validateBytes32(bytes) : () => null;

  const preloadedValue = action === ownProps.fieldName ? defaultValue : '';

  return {
    name,
    getting,
    value: displayValue,
    editOpen,
    editting,
    validate,
    preloadedValue
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { get, changeEdit, set } = ownProps;

  return {
    get: name => dispatch(get(name)),
    changeEdit: () => dispatch(changeEdit()),
    set: (name, value) => dispatch(set(name, value))
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return {
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    get: () => dispatchProps.get(stateProps.name),
    set: value => dispatchProps.set(stateProps.name, value)
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(FieldComponent);
