import React, { useEffect } from 'react';
import propTypes from 'prop-types';
import { multilanguage } from 'redux-multilanguage';
import { Row, Col } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';

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
  domain = '',
  isRegistryOwner,
  enabling,
  start,
  isExpired = false,
}) => {
  useEffect(() => {
    if (domain) start();
  }, [domain, start]);

  if (enabling) {
    return <UserWaitingComponent />;
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
            <Routes>
              <Route index element={<DomainInfoContainer />} />
              <Route path="reverse" element={advancedView ? <ReverseContainer /> : <DomainInfoContainer />} />
              {!isRegistryOwner ? (
                <Route path="*" element={<ReclaimContainer />} />
              ) : (
                <>
                  <Route path="myurl" element={<MyUrlContainer />} />
                  <Route path="addresses" element={<AddressesContainer />} />
                  <Route path="subdomains" element={<SubdomainsContainer />} />
                  <Route path="resolver" element={advancedView ? <ResolverContainer /> : <DomainInfoContainer />} />
                </>
              )}
            </Routes>
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
  domain: propTypes.string,
  isRegistryOwner: propTypes.bool.isRequired,
  enabling: propTypes.bool.isRequired,
  start: propTypes.func.isRequired,
  isExpired: propTypes.bool,
};

export default multilanguage(AdminComponent);
