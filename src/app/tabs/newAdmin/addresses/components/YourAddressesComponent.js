import React from 'react';
import propTypes from 'prop-types';
import { multilanguage } from 'redux-multilanguage';
import { Row, Col } from 'react-bootstrap';

import { ChainAddressEditContainer } from '../containers';
import networks from '../networks.json';
import { MULTICHAIN_RESOLVER } from '../../resolver/types';

const YourAddressesComponent = ({ strings, chainAddresses, resolver }) => (
  <Row>
    <Col>
      <h1>
        {strings.your_addresses}
        {resolver === MULTICHAIN_RESOLVER && ` - ${strings.multichain}`}
      </h1>
      <p>{strings.your_addresses_explanation}</p>
      {Object.entries(chainAddresses).map((chainAddress) => {
        if (chainAddress[1].address === '' || chainAddress[1].address === '0x0000000000000000000000000000000000000000') {
          return (<></>);
        }

        const chainName = chainAddress[0];
        const {
          chainId, address, isEditing, isWaiting, isSuccess, isError, successTx, errorMessage,
        } = chainAddress[1];

        const network = networks.filter(net => net.name === chainName)[0];

        return (
          <div className="break-below">
            <ChainAddressEditContainer
              key={chainName}
              label={chainName}
              labelIcon={network.icon}
              networkId={chainId}
              value={address}
              isError={isError}
              isEditing={isEditing}
              isWaiting={isWaiting}
              isSuccess={isSuccess}
              successTx={successTx}
              reset={isSuccess}
              validationChainId={network.checksum}
              validation={network.validate === 'HEX'}
              strings={{
                value_prefix: strings.value,
                error_message: errorMessage,
                cancel: strings.cancel,
                submit: strings.submit,
                edit_placeholder: '',
                success_message: '',
                waiting: strings.wait_transation_confirmed,
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

YourAddressesComponent.propTypes = {
  strings: propTypes.shape({
    cancel: propTypes.string.isRequired,
    submit: propTypes.string.isRequired,
    edit: propTypes.string.isRequired,
    delete: propTypes.string.isRequired,
    delete_chain_confirm: propTypes.string.isRequired,
    value: propTypes.string.isRequired,
    wait_transation_confirmed: propTypes.string.isRequired,
    your_addresses: propTypes.string.isRequired,
    your_addresses_explanation: propTypes.string.isRequired,
    multichain: propTypes.string.isRequired,
  }).isRequired,
  chainAddresses: propTypes.shape().isRequired,
  resolver: propTypes.string.isRequired,
};

export default multilanguage(YourAddressesComponent);
