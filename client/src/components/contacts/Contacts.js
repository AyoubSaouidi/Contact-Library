// Modules
import React, { Fragment, useContext } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
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
      <TransitionGroup>
        {filtered !== null
          ? filtered.map((contact) => (
              <CSSTransition key={contact.id} timeout={250} classNames='item'>
                <ContactItem contact={contact} />
              </CSSTransition>
            ))
          : contacts.map((contact) => (
              <CSSTransition key={contact.id} timeout={500} classNames='item'>
                <ContactItem contact={contact} />
              </CSSTransition>
            ))}
      </TransitionGroup>
    </Fragment>
  );
};

export default Contacts;
