import React from 'react';
import propTypes from 'prop-types';
import { multilanguage } from 'redux-multilanguage';
import { Row, Col } from 'react-bootstrap';

import { ChainAddressEditContainer } from '../containers';
import networks from '../networks.json';

const YourAddressesComponent = ({ strings, chainAddresses }) => (
  <Row>
    <Col>
      <h1>Your Addresses</h1>
      {Object.entries(chainAddresses).map((chainAddress) => {
        if (chainAddress[1].address === '' || chainAddress[1].address === '0x0000000000000000000000000000000000000000') {
          return (<></>);
        }

        const chainName = chainAddress[0];
        const {
          chainId, address, isEditing, isWaiting, isSuccess, isError, successTx, errorMessage,
        } = chainAddress[1];

        const validate = networks.filter(net => net.name === chainName)[0].validation === 'HEX';

        return (
          <div className="break-below">
            <ChainAddressEditContainer
              key={chainName}
              label={chainName}
              networkId={chainId}
              value={address}
              isError={isError}
              isEditing={isEditing}
              isWaiting={isWaiting}
              isSuccess={isSuccess}
              successTx={successTx}
              reset={isSuccess}
              validation={validate}
              strings={{
                value_prefix: '',
                error_message: errorMessage,
                cancel: strings.cancel,
                submit: strings.submit,
                edit_placeholder: '',
                success_message: '',
                waiting: '',
                delete: strings.delete,
                edit: strings.edit,
                delete_confirm_text: strings.delete_chain_confirm,
              }}
            />
          </div>
        );
      })}
    </Col>
  </Row>
);

YourAddressesComponent.defaultProps = {
  chainAddresses: [{}],
};

YourAddressesComponent.propTypes = {
  strings: propTypes.shape({
    cancel: propTypes.string.isRequired,
    submit: propTypes.string.isRequired,
    edit: propTypes.string.isRequired,
    delete: propTypes.string.isRequired,
    delete_chain_confirm: propTypes.string.isRequired,
  }).isRequired,
  chainAddresses: propTypes.arrayOf({
    chainId: propTypes.string.isRequired,
    address: propTypes.string.isRequired,
  }),
};

export default multilanguage(YourAddressesComponent);
