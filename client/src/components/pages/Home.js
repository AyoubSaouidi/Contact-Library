// Modules
import React from 'react';
// Contacts
import Contacts from '../contacts/Contacts';

const Home = () => {
  return (
    <div className='grid-2'>
      <div>Contacts Form</div>
      <div>
        <h3>Contacts</h3>
        <Contacts />
      </div>
    </div>
  );
};

export default Home;
