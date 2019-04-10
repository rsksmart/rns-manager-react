import React from 'react';
import { Link } from 'react-router-dom';
import { StartButton } from '../auth';
import logo from '../../logo.svg';
import { NotificationIcon } from '../notifications';

const Header = () => (
  <div className="header bg-dark">
		<div className="container-fluid">
			<nav className="navbar navbar-expand-lg pt-3">
				<a className="navbar-brand" href="https://rifos.org">
					<img src={logo} width="100" alt='logo' />
				</a>
				<button className="navbar-toggler d-lg-none ml-auto" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
					<i className="fas fa-bars"></i>
				</button>
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav ml-auto">
						<li className="nav-item active">
              <Link to="/" className='nav-link'>Home</Link>
						</li>
						<li className="nav-item">
              <Link to="/search" className='nav-link'>Search</Link>
						</li>
						<li className="nav-item">
              <Link to="/admin" className='nav-link'>Admin</Link>
						</li>
						<li className="nav-item">
              <Link to="/resolve" className='nav-link'>Resolve</Link>
						</li>
						<li className="nav-item">
              <Link to="/setup" className='nav-link'>Set up</Link>
						</li>
						<li className='nav-item'>
							<Link to='/notifications' className='nav-link'>
								<NotificationIcon />
							</Link>
						</li>
					</ul>
					<StartButton />
				</div>
			</nav>

		</div>
	</div>
)

export default Header;
