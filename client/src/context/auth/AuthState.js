// Modules
import React, { useReducer } from 'react';
// Context & Reducer
import AuthContext from './authContext';
import AuthReducer from './authReducer';
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
  // Load User

  // Register User

  // Login User

  // Logout User

  // Clear Errors

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        loading: state.loading,
        error: state.error,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
