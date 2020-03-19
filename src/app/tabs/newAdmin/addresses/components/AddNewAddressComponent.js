import React, { useState } from 'react';
import propTypes from 'prop-types';
import { multilanguage } from 'redux-multilanguage';
import { Row, Col, Button } from 'react-bootstrap';

import { validateAddress } from '../../../../validations';
import { UserErrorComponent, UserWaitingComponent, UserSuccessComponent } from '../../../../components';

const AddNewAddressComponent = ({
  strings,
  networks,
  handleClick,
  handleMessageClose,
  isWaiting,
  isError,
  isSuccess,
  isEditing,
  successTx,
  errorMessage,
}) => {
  const [localError, setLocalError] = useState('');
  const [selectedNetwork, setSelectedNetwork] = useState(networks[0].id);
  const [address, setAddress] = useState('');

  const handleAddClick = () => {
    const checkValidation = networks.filter(net => net.id === selectedNetwork)[0];
    if (checkValidation.validation === 'HEX') {
      if (validateAddress(address)) {
        return setLocalError(validateAddress(address));
      }
    }
    return handleClick(selectedNetwork, address);
  };

  const handleErrorClose = () => {
    setLocalError('');
    handleMessageClose();
  };

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
            {
              networks.map(network => (<option value={network.id}>{network.name}</option>))
            }
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

      <UserSuccessComponent
        visible={isSuccess}
        address={successTx}
        handleCloseClick={() => handleMessageClose()}
      />
    </div>
  );
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
  }).isRequired,
  handleClick: propTypes.func.isRequired,
  handleMessageClose: propTypes.func.isRequired,
  isWaiting: propTypes.bool.isRequired,
  isSuccess: propTypes.bool.isRequired,
  successTx: propTypes.string.isRequired,
  isError: propTypes.bool.isRequired,
  isEditing: propTypes.bool.isRequired,
  errorMessage: propTypes.string.isRequired,
};

export default multilanguage(AddNewAddressComponent);
