// Modules
import React, { useContext, useRef, useEffect } from 'react';
// Context
import ContactContext from '../../context/contact/contactContext';

const ContactFilter = () => {
  // Context
  const contactContext = useContext(ContactContext);
  const { filtered, filterContacts, clearFilter } = contactContext;

  // Ref
  const text = useRef('');

  // Use Effect
  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
  });

  const onChange = (e) => {
    if (text.current.value !== '') {
      filterContacts(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <form>
      <input
        ref={text}
        type='text'
        placeholder='Filter Contacts...'
        onChange={onChange}
      />
    </form>
  );
};

export default ContactFilter;
