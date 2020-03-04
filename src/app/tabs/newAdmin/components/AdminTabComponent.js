import React, { useEffect } from 'react';
import propTypes from 'prop-types';
import { multilanguage } from 'redux-multilanguage';
import { useDispatch } from 'react-redux';
import { Row, Col } from 'react-bootstrap';

import { start } from '../operations';
import { ToggleContainer } from '../../../containers';

const AdminComponent = (props) => {
  const { strings, toggleAdvancedBasic, advancedView } = props;
  const dispatch = useDispatch();
  useEffect(() => dispatch(start()), [dispatch]);
  return (
    <div className="admin">
      <Row>
        <Col md={12}>
          <ToggleContainer
            labelLeft={strings.basic}
            labelRight={strings.advanced}
            value={advancedView}
            onChange={toggleAdvancedBasic}
          />
        </Col>
      </Row>
      <Row>
        <Col md={3} className="leftnav">
          <ul>
            <li>
              Domain Info
            </li>
            <li>
              Your Addresses
            </li>
            <li>
              Subdomains
            </li>
            {advancedView
              && (
              <>
                <li>
                  Resolver
                </li>
                <li>
                  Reverse
                </li>
              </>
              )
            }
          </ul>
        </Col>
        <Col md={8}>
          {advancedView}
        </Col>
      </Row>
    </div>
  );
};

AdminComponent.propTypes = {
  strings: propTypes.shape({
    admin: propTypes.string.isRequired,
    advanced: propTypes.string.isRequired,
    basic: propTypes.string.isRequired,
  }).isRequired,
  advancedView: propTypes.bool.isRequired,
  toggleAdvancedBasic: propTypes.func.isRequired,
};

export default multilanguage(AdminComponent);
