// Modules
import React, { useContext, useEffect } from 'react';
// Context
import AuthContext from '../../context/auth/authContext';
// Contacts
import ContactForm from '../contacts/ContactForm';
import ContactFilter from '../contacts/ContactFilter';
import Contacts from '../contacts/Contacts';

const Home = () => {
  // Auth Context
  const authContext = useContext(AuthContext);
  const { loadUser } = authContext;

  // Effects
  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <div className='grid-2'>
      <div>
        <ContactForm />
      </div>
      <div>
        <ContactFilter />
        <Contacts />
      </div>
    </div>
  );
};

export default Home;
