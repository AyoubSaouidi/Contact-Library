// Modules
import React, { Fragment, useContext } from 'react';
// Contact UI
import ContactItem from './ContactItem';
// Context
import ContactContext from '../../context/contact/contactContext';

const Contacts = () => {
  // Contact Context
  const contactContext = useContext(ContactContext);
  // State from Provider
  const { contacts, filtered } = contactContext;

  if (contacts.length === 0) {
    return <h4 className='alert bg-light text-center'>Please add a contact</h4>;
  }

  return (
    <Fragment>
      {filtered !== null
        ? filtered.map((contact) => (
            <ContactItem contact={contact} key={contact.id} />
          ))
        : contacts.map((contact) => (
            <ContactItem contact={contact} key={contact.id} />
          ))}
    </Fragment>
  );
};

export default Contacts;
