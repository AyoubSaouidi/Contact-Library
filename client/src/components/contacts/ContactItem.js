// Modules
import React from 'react';
import PropTypes from 'prop-types';

const ContactItem = ({ contact }) => {
    // Deconstructuring Contact
    const { id, name, email, phone, type } = contact;

    return (
        <div className='card bg-light'>
            <h3 className='text-primary text-left'>
                {name}{' '}
                <span className={`badge badge-${type === 'personal' ? 'primary' : 'success'}`}>
                    {type[0].toUpperCase() + type.slice(1)}
                </span>
            </h3>
        </div>
    );
};

ContactItem.propTypes = {
    contact: PropTypes.object.isRequired,
};

export default ContactItem;
