// Modules
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Navbar = ({ icon, title }) => {
  return (
    <nav className='navbar bg-primary'>
      <h1>
        <i className={icon} /> {` ${title}`}
      </h1>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/about'>About</Link>
        </li>
      </ul>
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
