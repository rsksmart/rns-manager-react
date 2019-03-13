import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { default as Auth } from '../auth';

const Header = () => (
  <Navbar bg="light" expand="lg">
    <Navbar.Brand href="#">RNS</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Link to="/" className='nav-link'>Home</Link>
        <Link to="/search" className='nav-link'>Search</Link>
        <Link to="/admin" className='nav-link'>Admin</Link>
      </Nav>
      <Navbar.Text>
        <Auth />
      </Navbar.Text>
    </Navbar.Collapse>
  </Navbar>
);

export default Header;
