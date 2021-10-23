// Modules
import React, { useReducer } from 'react';
import axios from 'axios';
// Context & Reducer
import ContactContext from './contactContext';
import ContactReducer from './contactReducer';
// Types
import {
  GET_CONTACTS,
  CLEAR_CONTACTS,
  ADD_CONTACT,
  UPDATE_CONTACT,
  DELETE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  SET_CURRENT,
  CLEAR_CURRENT,
  CONTACT_ERROR,
} from '../types';

const ContactState = (props) => {
  // Initial State
  const initialState = {
    contacts: null,
    current: null,
    filtered: null,
    error: null,
  };

  // Dispatch to Reducer
  const [state, dispatch] = useReducer(ContactReducer, initialState);

  // ACTIONS --------------------------------------------------------
  // Get Contacts
  const getContacts = async () => {
    try {
      const response = await axios.get('/api/contacts');
      dispatch({ type: GET_CONTACTS, payload: response.data });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
    }
  };

  // Clear Contacts
  const clearContacts = () => dispatch({ type: CLEAR_CONTACTS });

  // Add Contact
  const addContact = async (contact) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const response = await axios.post('/api/contacts', contact, config);
      dispatch({ type: ADD_CONTACT, payload: response.data });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
    }
  };

  // Update Contact
  const updateContact = async (contact) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const response = await axios.put(
        `/api/contacts/${contact._id}`,
        contact,
        config
      );
      dispatch({
        type: UPDATE_CONTACT,
        payload: response.data,
      });
    } catch (err) {
      dispatch({
        type: CONTACT_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Delete Contact
  const deleteContact = async (id) => {
    try {
      await axios.delete(`/api/contacts/${id}`);
      dispatch({
        type: DELETE_CONTACT,
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: CONTACT_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Set Current Contact
  const setCurrent = (contact) => {
    dispatch({ type: SET_CURRENT, payload: contact });
  };

  // Clear Curret Contact
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // Filter Contacts
  const filterContacts = (text) => {
    dispatch({ type: FILTER_CONTACTS, payload: text });
  };
  // Clear Filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  // Context Provider ------------------------------------------------
  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        getContacts,
        clearContacts,
        addContact,
        deleteContact,
        updateContact,
        setCurrent,
        clearCurrent,
        filterContacts,
        clearFilter,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
