import React, { useEffect } from 'react';
import propTypes from 'prop-types';
import { multilanguage } from 'redux-multilanguage';
import { useDispatch } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { Switch, Route } from 'react-router';

import { AuthTabWrapper } from '../../../auth';
import { start } from '../operations';
import { ToggleContainer } from '../../../containers';
import {
  AddressesContainer,
  DomainInfoContainer,
  LeftNavContainer,
  ResolverContainer,
  ReverseContainer,
  SubdomainsContainer,
} from '../containers';

const AdminComponent = (props) => {
  const {
    strings,
    toggleAdvancedBasic,
    advancedView,
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
            <LeftNavContainer />
          </Col>
          <Col md={8}>
            <Switch>
              <Route path="/newAdmin/addresses" component={AddressesContainer} />
              <Route path="/newAdmin/subdomains" component={SubdomainsContainer} />

              <Route path="/newAdmin/resolver" component={advancedView ? ResolverContainer : DomainInfoContainer} />
              <Route path="/newAdmin/reverse" component={advancedView ? ReverseContainer : DomainInfoContainer} />
              <Route exact path="/newAdmin" component={DomainInfoContainer} />
            </Switch>
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
};

export default multilanguage(AdminComponent);
