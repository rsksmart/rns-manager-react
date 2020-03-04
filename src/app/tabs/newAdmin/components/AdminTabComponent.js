import React, { useEffect } from 'react';
import propTypes from 'prop-types';
import { multilanguage } from 'redux-multilanguage';
import { useDispatch } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { AuthTabWrapper } from '../../../auth';
import { start } from '../operations';
import { ToggleContainer } from '../../../containers';

const AdminComponent = (props) => {
  const {
    strings,
    toggleAdvancedBasic,
    advancedView,
    location,
  } = props;

  const dispatch = useDispatch();
  useEffect(() => dispatch(start()), [dispatch]);
  return (
    <AuthTabWrapper>
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
                <Link
                  to="/newAdmin"
                  className={location === '/newAdmin' ? 'active' : ''}
                >
                  Domain Info
                </Link>
              </li>
              <li>
                <Link
                  to="/newAdmin/addresses"
                  className={location === '/newAdmin/addresses' ? 'active' : ''}
                >
                  Your addresses
                </Link>
              </li>
              <li>
                <Link
                  to="/newAdmin/subdomains"
                  className={location === '/newAdmin/subdomains' ? 'active' : ''}
                >
                  Subdomains
                </Link>
              </li>
              {advancedView
                && (
                <>
                  <li>
                    <Link
                      to="/newAdmin/resolver"
                      className={location === '/newAdmin/resolver' ? 'active' : ''}
                    >
                      Resolver
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/newAdmin/reverse"
                      className={location === '/newAdmin/reverse' ? 'active' : ''}
                    >
                      Reverse
                    </Link>
                  </li>
                </>
                )
              }
            </ul>
          </Col>
          <Col md={8}>
            <h1>Hello World!</h1>
            {location}
          </Col>
        </Row>
      </div>
    </AuthTabWrapper>
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
  location: propTypes.string.isRequired,
};

export default multilanguage(AdminComponent);
