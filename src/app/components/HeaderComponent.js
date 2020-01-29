import React from 'react';
import propTypes from 'prop-types';
import {
  Navbar, Nav, Form, Container, Image,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { multilanguage } from 'redux-multilanguage';
import logo from '../../assets/img/logo.svg';
import logotest from '../../assets/img/logo-testnet.svg';
import { StartButton } from '../auth';
import { LanguageSelectContainer } from '../containers';


const HeaderComponent = (props) => {
  const { strings, isLoggedIn, network } = props;

  return (
    <Navbar
      expand="md"
      className="navbar-expand-md navbar-light bg-light fixed-top"
    >
      <Container>
        <Link to="/" className="navbar-brand">
          <Image
            src={(network === '31') ? logotest : logo}
            className="logo"
            alt="RSK Logo"
          />
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse className>
          <Nav className="ml-auto">
            <Nav.Item key={strings.search}>
              <Link to="/search" className="nav-link" title={strings.search}>
                {strings.search}
              </Link>
            </Nav.Item>
            <Nav.Item key={strings.resolve}>
              <Link to="/resolve" className="nav-link" title={strings.resolve}>
                {strings.resolve}
              </Link>
            </Nav.Item>
            {
              isLoggedIn
              && (
                <Nav.Item key={strings.admin}>
                  <Link className="nav-link" to="/admin">
                    {strings.admin}
                  </Link>
                </Nav.Item>
              )
            }
          </Nav>
          <Form onSubmit={e => e.preventDefault()} inline>
            <LanguageSelectContainer />
            <StartButton />
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

HeaderComponent.propTypes = {
  strings: propTypes.shape().isRequired,
  isLoggedIn: propTypes.bool.isRequired,
  network: propTypes.string.isRequired,
};

export default multilanguage(HeaderComponent);
