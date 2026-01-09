import React from 'react';
import propTypes from 'prop-types';
import {
  Container, Image, Col, Row,
} from 'react-bootstrap';
import { multilanguage } from 'redux-multilanguage';
import logo from '../../assets/img/rif_black.svg';

import { version } from '../../../package.json';
import PlausibleAnalytics from './PlausibleAnalytics';

const FooterComponent = (props) => {
  const { strings } = props;

  const linkProps = {
    target: '_blank',
    rel: 'noopener noreferrer',
  };

  const appUrl = process.env.REACT_APP_URL;
  const domain = appUrl.slice(appUrl.indexOf('//') + 2, -1);

  return (
    <footer>
      <div className="footer-top">
        <Container>
          <Row>
            <Col lg="3">
              <Image style={{ height: '45px' }} src={logo} alt="RIF Logo" />
            </Col>
            <Col lg="2">
              <h2>RIF</h2>
              <ul>
                <li>
                  <a href="https://developers.rsk.co/rif/" {...linkProps}>{strings.services}</a>
                </li>
                <li>
                  <a href="https://rif.technology/static/add903ce229a6f45a606cd78b028cf9e/RIF-whitepaper-V2.pdf" {...linkProps}>
                    {strings.whitepaper}
                  </a>
                </li>
                <li>
                  <a href="https://rif.technology/rif-token/" {...linkProps}>{strings.rif_token}</a>
                </li>
              </ul>
            </Col>
            <Col lg="3">
              <h2>{strings.home_title}</h2>
              <ul>
                <li><a href="https://dev.rootstock.io/kb/faqs/" {...linkProps}>FAQs</a></li>
                <li>
                  <a href="https://gitter.im/rsksmart/rif-name-service" {...linkProps}>{strings.contact}</a>
                </li>
              </ul>
            </Col>
            <Col lg="2">
              <h2>{strings.developers}</h2>
              <ul>
                <li><a href="https://developers.rsk.co/rif/rns" {...linkProps}>{strings.docs}</a></li>
                <li>
                  <a href="https://github.com/rnsdomains/" {...linkProps}>Github</a>
                </li>
              </ul>
            </Col>
            <Col lg="2">
              <h2>{strings.privacy}</h2>
              <ul>
                <li>
                  <a href="https://rif.technology/privacy-policy" {...linkProps}>{strings.privacy_policy}</a>
                </li>
                <li>
                  <a href="https://rif.technology/terms-conditions" {...linkProps}>{strings.terms}</a>
                </li>
              </ul>
            </Col>
          </Row>
          <Row>
            <Col>
              <p style={{ fontSize: '.8em' }}>
                {`Copyright © ${new Date().getFullYear()} `}
                RootstockLabs. All rights reserved.
                {` ${version}`}
                {process.env.REACT_APP_GIT_HASH && ` (${process.env.REACT_APP_GIT_HASH.slice(0, 7)})`}
              </p>
            </Col>
          </Row>
        </Container>
      </div>
      <PlausibleAnalytics domain={domain} />
    </footer>
  );
};

FooterComponent.propTypes = {
  strings: propTypes.shape().isRequired,
};

export default multilanguage(FooterComponent);
