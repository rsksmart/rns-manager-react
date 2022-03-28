import React from 'react';
import propTypes from 'prop-types';
import { multilanguage } from 'redux-multilanguage';
import { Row, Col } from 'react-bootstrap';

import { ChainAddressEditContainer } from '../containers';
import networks from '../networks.json';
import { MULTICHAIN_RESOLVER, PUBLIC_RESOLVER, DEFINITIVE_RESOLVER } from '../../resolver/types';
import { EMPTY_ADDRESS } from '../../types';
import { truncateString } from '../../helpers';

const YourAddressesComponent = ({
  strings, chainAddresses, resolverName, userAddress,
}) => (
  <Row>
    <Col>
      <h1>
        {strings.domain_addresses}
      </h1>
      <p>
        {resolverName === PUBLIC_RESOLVER && strings.public_resolver_explanation}
        {(resolverName === MULTICHAIN_RESOLVER || resolverName === DEFINITIVE_RESOLVER)
          && strings.your_addresses_explanation}
      </p>

      {Object.entries(chainAddresses).map((chainAddress) => {
        if (chainAddress[1].address === '' || chainAddress[1].address === EMPTY_ADDRESS) {
          return (<></>);
        }

        const chainName = chainAddress[0];
        const {
          chainId, address, isEditing, isWaiting, isSuccess, isError, successTx, errorMessage,
        } = chainAddress[1];

        const network = networks.filter(net => net.name === chainName)[0];
        const isHex = network.validation === 'HEX';
        const networkChainId = chainName === 'RSK' ? process.env.REACT_APP_ENVIRONMENT_ID : null;

        const suggestion = chainName === 'RSK' ? [{
          name: `${strings.your_address} (${truncateString(address)})`,
          value: userAddress,
        }] : [];

        return (
          <div className="break-below">
            <ChainAddressEditContainer
              key={chainName}
              label={chainName}
              labelIcon={`${process.env.PUBLIC_URL}/assets/icons/${network.icon}`}
              networkId={chainId}
              value={address}
              isError={isError}
              isEditing={isEditing}
              isWaiting={isWaiting}
              isSuccess={isSuccess}
              successTx={successTx}
              reset={isSuccess}
              validationChainId={networkChainId}
              validation={isHex}
              suggestions={suggestion}
              strings={{
                error_message: errorMessage,
                cancel: strings.cancel,
                submit: strings.change,
                edit_placeholder: strings.paste_your_address,
                success_message: '',
                waiting: strings.wait_transation_confirmed,
                delete: strings.delete,
                edit: strings.edit,
                delete_confirm_text: strings.delete_chain_confirm,
                edit_propmt: strings.new_value,
                suggestion: strings.suggestion,
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
    change: propTypes.string.isRequired,
    edit: propTypes.string.isRequired,
    delete: propTypes.string.isRequired,
    delete_chain_confirm: propTypes.string.isRequired,
    value: propTypes.string.isRequired,
    wait_transation_confirmed: propTypes.string.isRequired,
    domain_addresses: propTypes.string.isRequired,
    your_addresses_explanation: propTypes.string.isRequired,
    public_resolver_explanation: propTypes.string.isRequired,
    multichain: propTypes.string.isRequired,
    paste_your_address: propTypes.string.isRequired,
    your_address: propTypes.string.isRequired,
    suggestion: propTypes.string.isRequired,
    new_value: propTypes.string.isRequired,
  }).isRequired,
  chainAddresses: propTypes.shape().isRequired,
  resolverName: propTypes.string.isRequired,
  userAddress: propTypes.string.isRequired,
};

export default multilanguage(YourAddressesComponent);
