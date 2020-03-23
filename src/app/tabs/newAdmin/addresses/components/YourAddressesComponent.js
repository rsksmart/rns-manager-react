import React from 'react';
import propTypes from 'prop-types';
import { multilanguage } from 'redux-multilanguage';
import { Row, Col } from 'react-bootstrap';

import { ChainAddressEditContainer } from '../containers';

const YourAddressesComponent = ({ strings, chainAddresses }) => {
  return (
    <Row>
      <Col>
        <h1>Your Addresses</h1>
        {Object.entries(chainAddresses).map(address => (
          <div className="break-below">
            <ChainAddressEditContainer
              key={address[0]}
              label={address[0]}
              value={address[1].address}
              isError={false}
              isWaiting={false}
              isSuccess={false}
              successTx={false}
              reset={false}
              strings={{
                value_prefix: '',
                error_message: '',
                cancel: strings.cancel,
                submit: strings.submit,
                edit_placeholder: '',
                success_message: '',
                waiting: '',
                delete: strings.delete,
                edit: strings.edit,
                delete_confirm_text: '',
              }}
            />
          </div>
        ))}
      </Col>
    </Row>
  );
};

YourAddressesComponent.defaultProps = {
  chainAddresses: [],
};

YourAddressesComponent.propTypes = {
  strings: propTypes.shape({
    cancel: propTypes.string.isRequired,
    submit: propTypes.string.isRequired,
    edit: propTypes.string.isRequired,
    delete: propTypes.string.isRequired,
  }).isRequired,
  chainAddresses: propTypes.arrayOf({
    chainId: propTypes.string.isRequired,
    address: propTypes.string.isRequired,
  }),
};

export default multilanguage(YourAddressesComponent);
