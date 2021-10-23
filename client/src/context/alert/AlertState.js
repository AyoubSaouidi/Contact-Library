// Modules
import { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
// Context & Reducer
import AlertContext from './alertContext';
import AlertReducer from './alertReducer';
// Types
import { SET_ALERT, REMOVE_ALERT } from '../types';

const AlertState = (props) => {
  // Initial State
  const initialState = [];

  // Dispatch to Reducer
  const [state, dispatch] = useReducer(AlertReducer, initialState);

  // ACTIONS -----------------------------------------------------
  // Set Alerts
  const setAlert = (msg, type, timeout = 5000) => {
    // Create Alert
    const id = uuidv4();
    dispatch({ type: SET_ALERT, payload: { msg, type, id } });

    // Timeout of Alert
    setTimeout(() => removeAlert(id), timeout);
  };

  // Remove Alert
  const removeAlert = (id) => dispatch({ type: REMOVE_ALERT, payload: id });

  return (
    <AlertContext.Provider
      value={{
        alerts: state,
        setAlert,
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
