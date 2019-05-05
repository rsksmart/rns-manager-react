import React, { Component } from 'react';
import { Navbar, Nav, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import { StartButton } from '../auth';
import { multilanguage } from 'redux-multilanguage';

class HeaderComponent extends Component {
	render () {
		const { strings, isLoggedIn, viewMyCrypto } = this.props;

		return (
			<Navbar bg='dark' variant='dark' expand='lg' sticky='top'>
				<Link to='/' className='navbar-brand'>
					<img src={logo} width='100' alt='logo' />
				</Link>
				<Navbar.Toggle aria-controls='responsive-navbar-nav' />
				<Navbar.Collapse id='responsive-navbar-nav'>
					<Nav className='mr-auto'></Nav>
					<Nav>
						<Link to='/search' className='nav-link'>{strings.search}</Link>
						<Link to='/resolve' className='nav-link'>{strings.resolve}</Link>
						{
							(isLoggedIn || viewMyCrypto) &&
							<React.Fragment>
								<Link to='/admin' className='nav-link'>{strings.admin}</Link>
							</React.Fragment>
						}
					</Nav>
					<Form onSubmit={e => e.preventDefault()} inline>
						<StartButton />
					</Form>
				</Navbar.Collapse>
			</Navbar>
		)
	}
}

export default multilanguage(HeaderComponent);
