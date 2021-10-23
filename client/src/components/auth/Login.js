// Modules
import React, { useState, useContext, useEffect } from 'react';
// Context
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const Login = (props) => {
  // Alert Context
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  // AUTH Context
  const authContext = useContext(AuthContext);
  const { isAuthenticated, error, clearErrors, loginUser } = authContext;

  // EFFECTS
  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }

    if (error === 'Invalid Credentials') {
      setAlert(error, 'danger');
      clearErrors();
    }

    // eslint-disable-next-line
  }, [isAuthenticated, props.history, error]);

  // Form inputs state
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  // Deconstructoring form inputs state
  const { email, password } = user;

  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (email === '' || password === '') {
      setAlert('Please enter all fields', 'danger');
    } else {
      loginUser({
        email,
        password,
      });
    }
  };

  return (
    <div className='form-container'>
      <h1>
        Account <span className='text-primary'>Login</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            name='email'
            placeholder='Email'
            value={email}
            onChange={onChange}
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
            minLength={6}
            required
          />
        </div>
        <input
          type='submit'
          value='Login'
          className='btn btn-primary btn-block'
        />
      </form>
    </div>
  );
};

export default Login;
