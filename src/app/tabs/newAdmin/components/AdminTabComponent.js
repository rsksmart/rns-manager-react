import React, { useEffect } from 'react';
import propTypes from 'prop-types';
import { multilanguage } from 'redux-multilanguage';
import { Row, Col } from 'react-bootstrap';
import { Switch, Route } from 'react-router';

import { AuthTabWrapper } from '../../../auth';
import ToggleComponent from '../../../components/ToggleComponent';
import UserWaitingComponent from '../../../components/UserWaitingComponent';

import {
  LeftNavContainer, ReclaimContainer, ExpiredDomainContainer,
} from '../containers';

import { DomainInfoContainer } from '../domainInfo/containers';
import { SubdomainsContainer } from '../subdomains/containers';
import { ReverseContainer } from '../reverse/containers';
import { AddressesContainer } from '../addresses/containers';
import { ResolverContainer } from '../resolver/containers';
import MyUrlContainer from '../myurl/containers/MyUrlContainer';

const AdminComponent = ({
  strings,
  toggleAdvancedBasic,
  advancedView,
  domain,
  isRegistryOwner,
  enabling,
  start,
  isExpired,
}) => {
  if (enabling) {
    return <UserWaitingComponent />;
  }

  if (domain) {
    useEffect(() => start(), []);
  }

  if (isExpired) {
    return <ExpiredDomainContainer />;
  }

  return (
    <AuthTabWrapper>
      <div className="admin">
        <Row>
          <Col md={12}>
            <ToggleComponent
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
          <Col md={9}>
            <Switch>
              <Route exact path="/newAdmin" component={DomainInfoContainer} />
              <Route path="/newAdmin/reverse" component={advancedView ? ReverseContainer : DomainInfoContainer} />

              {
                !isRegistryOwner && <Route component={ReclaimContainer} />
              }
              <Route path="/newAdmin/myurl" component={MyUrlContainer} />
              <Route path="/newAdmin/addresses" component={AddressesContainer} />
              <Route path="/newAdmin/subdomains" component={SubdomainsContainer} />
              <Route path="/newAdmin/resolver" component={advancedView ? ResolverContainer : DomainInfoContainer} />
            </Switch>
          </Col>
        </Row>
      </div>
    </AuthTabWrapper>
  );
};

AdminComponent.defaultProps = {
  domain: '',
  isExpired: false,
};

AdminComponent.propTypes = {
  strings: propTypes.shape({
    admin: propTypes.string.isRequired,
    advanced: propTypes.string.isRequired,
    basic: propTypes.string.isRequired,
  }).isRequired,
  advancedView: propTypes.bool.isRequired,
  toggleAdvancedBasic: propTypes.func.isRequired,
  domain: propTypes.string,
  isRegistryOwner: propTypes.bool.isRequired,
  enabling: propTypes.bool.isRequired,
  start: propTypes.func.isRequired,
  isExpired: propTypes.bool,
};

export default multilanguage(AdminComponent);
