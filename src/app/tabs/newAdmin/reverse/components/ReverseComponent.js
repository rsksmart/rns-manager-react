import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import propTypes from 'prop-types';
import { multilanguage } from 'redux-multilanguage';
import { toChecksumAddress } from 'rskjs-util';

import ReverseInputContainer from '../containers/ReverseInputContainer';
import { getReverse } from '../operations';
import { UserWaitingComponent } from '../../../../components';

const ReverseComponent = ({
  reverseValue, address, strings, isRequesting, isWaiting, isError,
  errorMessage, isSuccess, successTx, chainId, domain,
}) => {
  const dispatch = useDispatch();
  useEffect(() => dispatch(getReverse(address)), []);

  if (isRequesting) {
    return (<UserWaitingComponent visible />);
  }

  return (
    <div className="reverse">
      <h1>{strings.reverse}</h1>
      <p>{strings.reverse_explanation}</p>
      <h2>{strings.set_reverse}</h2>
      <ReverseInputContainer
        value={reverseValue}
        label={toChecksumAddress(address, chainId)}
        allowDelete={false}
        validate={false}
        isWaiting={isWaiting}
        isError={isError}
        reset={isSuccess}
        isSuccess={isSuccess}
        successTx={successTx}
        validation={false}
        suggestions={[{
          name: domain,
          value: domain,
        }]}
        strings={{
          value_prefix: '',
          submit: strings.submit,
          cancel: strings.cancel,
          error_message: errorMessage,
          success_message: strings.reverse_success,
          edit_propmt: strings.domain,
          waiting: strings.wait_transation_confirmed,
          suggestion: `${strings.suggestion}`,
          edit_placeholder: strings.type_domain,
        }}
      />
    </div>
  );
};

ReverseComponent.propTypes = {
  strings: propTypes.shape({
    set_reverse: propTypes.string.isRequired,
    reverse_explanation: propTypes.string.isRequired,
    submit: propTypes.string.isRequired,
    cancel: propTypes.string.isRequired,
    reverse_success: propTypes.string.isRequired,
    not_set: propTypes.string.isRequired,
    domain: propTypes.string.isRequired,
    wait_transation_confirmed: propTypes.string.isRequired,
    suggestion: propTypes.string.isRequired,
    type_domain: propTypes.string.isRequired,
    reverse: propTypes.string.isRequired,
  }).isRequired,
  address: propTypes.string.isRequired,
  chainId: propTypes.number.isRequired,
  reverseValue: propTypes.string.isRequired,
  isRequesting: propTypes.bool.isRequired,
  isError: propTypes.bool.isRequired,
  errorMessage: propTypes.string.isRequired,
  successTx: propTypes.string.isRequired,
  isWaiting: propTypes.bool.isRequired,
  isSuccess: propTypes.bool.isRequired,
  domain: propTypes.string.isRequired,
};

export default multilanguage(ReverseComponent);
