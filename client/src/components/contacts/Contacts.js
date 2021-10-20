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
  const { contacts } = contactContext;

  return (
    <Fragment>
      {contacts.map((contact) => (
        <ContactItem contact={contact} key={contact.id} />
      ))}
    </Fragment>
  );
};

export default Contacts;
