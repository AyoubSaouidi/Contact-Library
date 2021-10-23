// Modules
import React, { useContext } from 'react';
// Layout
import Alert from './Alert';
// Context
import AlertContext from '../../context/alert/alertContext';

const Alerts = () => {
  // Context
  const alertContext = useContext(AlertContext);
  const { alerts } = alertContext;

  return (
    alerts.length > 0 &&
    alerts.map((alert) => <Alert key={alert.id} alert={alert} />)
  );
};

export default Alerts;
