import React from 'react';
import PropTypes from 'prop-types';

const Alert = ({ alert }) => {
  return (
    <div className={`alert alert-${alert.type}`}>
      <i className='fas fa-info-circle' /> {alert.msg}
    </div>
  );
};

Alert.propTypes = {
  alert: PropTypes.object.isRequired,
};

export default Alert;
