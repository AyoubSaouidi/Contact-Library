// Modules
import React, { useReducer } from 'react';
import uuid from 'uuid';
// Context & Reducer
import ContactContext from './contactContext';
import ContactReducer from './contactReducer';
// Types
import {
    ADD_CONTACT,
    UPDATE_CONTACT,
    DELETE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER,
    SET_CURRENT,
    CLEAR_CURRENT,
} from '../types';

const ContactState = (props) => {
    // Initial State
    const initialState = {
        contacts: [
            {
                id: 1,
                name: 'Rkia EL Yamini',
                email: 'rkia.elyamini@gmail.com',
                phone: '111-111-1111',
                type: 'personal',
            },
            {
                id: 2,
                name: 'Abdelrahim Saouidi',
                email: 'abrkaa@yahoo.fr',
                phone: '222-222-2222',
                type: 'personal',
            },
            {
                id: 3,
                name: 'Imane Zouhour',
                email: 'imane.zouhour.112@gmail.com',
                phone: '001-001-0000',
                type: 'professional',
            },
        ],
    };

    // Dispatch Reducer
    const [state, dispatch] = useReducer(ContactReducer, initialState);

    // ACTIONS --------------------------------------------------------
    // Add Contact

    // Update Contact

    // Delete Contact

    // Set Current Contact

    // Clear Curret Contact

    // Filter Contacts

    // Clear Filter

    // Context Provider ------------------------------------------------
    return (
        <ContactContext.Provider
            value={{
                contacts: state.contacts,
            }}
        >
            {props.children}
        </ContactContext.Provider>
    );
};

export default ContactState;
