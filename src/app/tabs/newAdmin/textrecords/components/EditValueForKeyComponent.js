import React, { useState } from 'react';
import propTypes from 'prop-types';
import { multilanguage } from 'redux-multilanguage';
import {
  Row, Col, Button,
} from 'react-bootstrap';
import UserWaitingComponent from '../../../../components/UserWaitingComponent';


const EditValueForKeyComponent = ({
  strings, handleSubmit, value, disabled,
}) => {
  const [state, setState] = useState({
    key: value ? value.id : '',
    value: '',
    disabled: true,
  });

  return (
    <Row className="textRecordInput">
      <Col md="12">
        <label htmlFor="text">
          String
          <input
            id="value"
            onChange={e => setState({ ...state, value: e.target.value })}
          />
        </label>
      </Col>
      <Col sm="3">
        <Button
          className="save"
          onClick={() => handleSubmit(state)}
          disabled={disabled}
        >
          {strings.submit}
        </Button>
      </Col>
      {!handleSubmit && (
        <UserWaitingComponent
          visible={disabled}
          message={strings.wait_transation_confirmed}
        />
      )
      }
    </Row>
  );
};

EditValueForKeyComponent.propTypes = {
  value: propTypes.arrayOf.isRequired,
  handleSubmit: propTypes.func.isRequired,
  strings: propTypes.shape({
    submit: propTypes.string.isRequired,
    wait_transation_confirmed: propTypes.string.isRequired,
  }).isRequired,
  disabled: propTypes.bool.isRequired,

};

export default multilanguage(EditValueForKeyComponent);
