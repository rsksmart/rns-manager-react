import React, { useState } from 'react';
import propTypes from 'prop-types';
import { multilanguage } from 'redux-multilanguage';
import { Row, Col, Button } from 'react-bootstrap';

import { validateAddress } from '../../../../validations';
import { UserErrorComponent, UserWaitingComponent } from '../../../../components';
import { ChecksumErrorContainer } from '../../../../containers';
import { getChainNameById } from '../operations';
import allNetworks from '../networks.json';

const AddNewAddressComponent = ({
  strings,
  networks,
  handleClick,
  handleClose,
  chainAddresses,
}) => {
  // all available addresses have been set, return before states are set
  if (networks.length === 0) {
    return (<></>);
  }

  const [localError, setLocalError] = useState('');
  const [checksumError, setChecksumError] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState(networks[0][1].chainId);
  const [address, setAddress] = useState('');

  const networkName = getChainNameById(selectedNetwork);

  if (chainAddresses[networkName].isSuccess && address !== '') {
    setSelectedNetwork(networks[0][1].chainId);
    setAddress('');
  }

  const handleAddClick = () => {
    const networkInfo = allNetworks.filter(net => net.id === selectedNetwork)[0];

    if (networkInfo.validation && networkInfo.validation === 'HEX') {
      const validationChainId = allNetworks.filter(net => net.id === selectedNetwork)[0].checksum
        || process.env.REACT_APP_ENVIRONMENT_ID;

      switch (validateAddress(address, validationChainId || process.env.REACT_APP_ENVIRONMENT_ID)) {
        case 'Invalid address':
          return setLocalError('Invalid address');
        case 'Invalid checksum':
          return setChecksumError(true);
        default:
      }
    }
    return handleClick(selectedNetwork, address);
  };

  const handleChecksumClick = (lowerAddress) => {
    setChecksumError(false);
    setAddress(lowerAddress);
    handleClick(selectedNetwork, address);
  };

  const handleErrorClose = () => {
    setLocalError('');
    handleClose(networkName);
  };

  const {
    isWaiting,
    isError,
    isEditing,
    errorMessage,
  } = chainAddresses[networkName];

  return (
    <div className="break-above addNew">
      <Row>
        <Col>
          <h2 className="gray normal-size">
            {strings.add_new_chain_address}
          </h2>
        </Col>
      </Row>
      <Row>
        <Col md={3}>
          <select
            onChange={evt => setSelectedNetwork(evt.target.value)}
            value={selectedNetwork}
          >
            {networks.map(chainAddress => (
              <option value={chainAddress[1].chainId}>{chainAddress[0]}</option>))}
          </select>
        </Col>
        <Col md={7}>
          <input
            placeholder={strings.paste_your_address}
            onChange={evt => setAddress(evt.target.value)}
            disabled={isEditing}
          />
        </Col>
        <Col md={2}>
          <Button
            onClick={handleAddClick}
            disabled={isEditing}
          >
            {strings.add}
          </Button>
        </Col>
      </Row>

      <UserErrorComponent
        message={errorMessage || localError}
        visible={isError || (localError !== '')}
        handleCloseClick={() => handleErrorClose()}
      />

      <UserWaitingComponent
        message={strings.wait_transation_confirmed}
        visible={isWaiting}
      />

      {checksumError
        && (
          <div className="checksumError">
            <ChecksumErrorContainer
              show={checksumError}
              inputValue={address}
              handleClick={handleChecksumClick}
            />
          </div>
        )
      }

    </div>
  );
};

AddNewAddressComponent.defaultProps = {
  networks: [],
  chainAddresses: {
    isWaiting: false,
    isError: false,
    isEditing: false,
    isSuccess: false,
    errorMessage: '',
  },
};

AddNewAddressComponent.propTypes = {
  strings: propTypes.shape({
    add: propTypes.string.isRequired,
    wait_transation_confirmed: propTypes.string.isRequired,
    add_new_chain_address: propTypes.string.isRequired,
    paste_your_address: propTypes.string.isRequired,
  }).isRequired,
  networks: propTypes.arrayOf({
    name: propTypes.string.isRequired,
    id: propTypes.string.isRequired,
  }),
  chainAddresses: propTypes.shape({
    isWaiting: propTypes.bool,
    isError: propTypes.bool,
    isEditing: propTypes.bool,
    isSuccess: propTypes.bool,
    errorMessage: propTypes.string,
  }),
  handleClick: propTypes.func.isRequired,
  handleClose: propTypes.func.isRequired,
};

export default multilanguage(AddNewAddressComponent);
