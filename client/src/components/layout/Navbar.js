// Modules
import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// Context
import AuthContext from '../../context/auth/authContext';
import ContactContext from '../../context/contact/contactContext';

const Navbar = ({ icon, title }) => {
  // Auth Context
  const authContext = useContext(AuthContext);
  const { isAuthenticated, user, logoutUser } = authContext;

  // Contact Context
  const contactContext = useContext(ContactContext);
  const { clearContacts } = contactContext;

  // LoGouT
  const onLogout = () => {
    logoutUser();
    clearContacts();
  };

  // Links
  const authLinks = (
    <Fragment>
      <li>
        Welcome <strong>{user !== null && user.name}</strong>
      </li>
      <li>
        <a onClick={onLogout} href='#!'>
          <i className='fas fa-sign-out-alt' />{' '}
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <Link to='/login'>Login</Link>
      </li>
      <li>
        <Link to='/register'>Register</Link>
      </li>
    </Fragment>
  );

  return (
    <nav className='navbar bg-primary'>
      <h1>
        <i className={icon} /> {` ${title}`}
      </h1>
      <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
    </nav>
  );
};

Navbar.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
};

Navbar.defaultProps = {
  icon: 'fas fa-book-reader',
  title: 'Contact Library',
};

export default Navbar;
