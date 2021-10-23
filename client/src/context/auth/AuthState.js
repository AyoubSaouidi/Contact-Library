// Modules
import React, { useReducer } from 'react';
import axios from 'axios';
// Context & Reducer
import AuthContext from './authContext';
import AuthReducer from './authReducer';
// Utils
import setAuthToken from '../../utils/setAuthToken';
// Types
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
} from '../types';

const AuthState = (props) => {
  // Initial State
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    user: null,
    loading: true,
    error: null,
  };

  // Dispatch to Reducer
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  // Actions ---------------------------------------
  // Register User
  const registerUser = async (formData) => {
    const config = {
      header: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const response = await axios.post('/api/users', formData, config);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: response.data,
      });

      loadUser();
    } catch (err) {
      dispatch({ type: REGISTER_FAIL, payload: err.response.data.msg });
    }
  };

  // Load User
  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      const response = await axios.get('/api/auth');
      dispatch({
        type: USER_LOADED,
        payload: response.data,
      });
    } catch (err) {
      dispatch({ type: AUTH_ERROR });
    }
  };

  // Login User
  const loginUser = async (formData) => {
    const config = {
      header: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const response = await axios.post('/api/auth', formData, config);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: response.data,
      });

      loadUser();
    } catch (err) {
      dispatch({ type: LOGIN_FAIL, payload: err.response.data.msg });
    }
  };

  // Logout User
  const logoutUser = () => dispatch({ type: LOGOUT });

  // Clear Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        loading: state.loading,
        error: state.error,
        registerUser,
        loginUser,
        loadUser,
        logoutUser,
        clearErrors,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
