import React from 'react';
import propTypes, { string } from 'prop-types';
import { multilanguage } from 'redux-multilanguage';
import { Row, Col } from 'react-bootstrap';

const YourAddressesComponent = ({ strings, chainAddresses }) => {
  return (
    <Row>
      <Col>
        <h1>Your Addresses</h1>
        {Object.entries(chainAddresses).map((address) => {
          console.log("******", address);
          return (
            <div className="break-below">
              {address[0]}
              ---
              {address[1].address}
            </div>
          );
        })
      }
      </Col>
    </Row>
  );
};

YourAddressesComponent.defaultProps = {
  chainAddresses: [],
};

YourAddressesComponent.propTypes = {
  strings: propTypes.shape({

  }).isRequired,
  chainAddresses: propTypes.arrayOf({
    chainId: propTypes.string.isRequired,
    address: propTypes.string.isRequired,
  }),
};

export default multilanguage(YourAddressesComponent);
