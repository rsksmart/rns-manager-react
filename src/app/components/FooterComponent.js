import React from 'react';
import propTypes from 'prop-types';
import {
  Container, Image, Col, Row,
} from 'react-bootstrap';
import { multilanguage } from 'redux-multilanguage';
import logo from '../../assets/img/powered_by_iov.svg';

const FooterComponent = (props) => {
  const { strings } = props;

  return (
    <footer>
      <div className="footer-top">
        <Container>
          <Row>
            <Col lg={12}>
              <Image
                style={{ zIndex: 100 }}
                className="img-fluid powered_by"
                src={logo}
              />
            </Col>
          </Row>
          <Row>
            <Col lg="4">
              <span className="footer-title mb-3">{strings.what_is_rns_title}</span>
              <p className="mb-5">{strings.what_is_rns_text}</p>
            </Col>
            <Col lg="4" />
            <Col lg="2">
              <span className="footer-title mb-3">{strings.develop}</span>
              <a href="https://developers.rsk.co/rif/rns/libs/">
                {strings.libs}
              </a>
              <a href="https://developers.rsk.co/rif/rns/">
                {strings.docs}
              </a>
              <a href="https://github.com/rnsdomains">
                {strings.github}
              </a>
            </Col>
            <Col lg="2">
              <span className="footer-title mb-3">{strings.learn}</span>
              <a href="https://docs.rifos.org/rif-whitepaper-en.pdf">
                {strings.rif_white_paper}
              </a>
              <a href="https://docs.rifos.org/rif-directory-protocol-en.pdf">
                {strings.rns_white_paper}
              </a>
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  );
};

FooterComponent.propTypes = {
  strings: propTypes.shape().isRequired,
};

export default multilanguage(FooterComponent);
