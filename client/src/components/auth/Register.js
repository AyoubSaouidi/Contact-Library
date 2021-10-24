// Modules
import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// Context
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const Register = (props) => {
  // Alert Context
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  // AUTH Context
  const authContext = useContext(AuthContext);
  const { isAuthenticated, error, clearErrors, registerUser } = authContext;

  // EFFECTS
  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }

    if (error === 'User already exists') {
      setAlert(error, 'danger');
      clearErrors();
    }

    // eslint-disable-next-line
  }, [isAuthenticated, props.history, error]);

  // Form inputs state
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  // Deconstructoring form inputs state
  const { name, email, password, password2 } = user;

  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (name === '' || email === '' || password === '') {
      setAlert('Please enter all fields', 'danger');
    } else if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      registerUser({
        name,
        email,
        password,
      });
    }
  };

  return (
    <div className='form-container'>
      <h1>
        Account <span className='text-primary'>Register</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            name='name'
            placeholder='Name'
            value={name}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            name='email'
            placeholder='Email'
            value={email}
            onChange={onChange}
            minLength={6}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            placeholder='Password'
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password2'>Confirm password</label>
          <input
            type='password'
            name='password2'
            placeholder='Confirm Password'
            value={password2}
            onChange={onChange}
          />
        </div>
        <input
          type='submit'
          value='Register'
          className='btn btn-primary btn-block'
        />
        <p className='badge badge-light text-center'>
          Already have an account?{' '}
          <Link to='/login' className='text-primary'>
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
