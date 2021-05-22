import React, { useContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const ContactContext = React.createContext();

export function useContact() {
   return useContext(ContactContext);
}

export function ContactsProvider({ children }) {
   const [contacts, setContacts] = useLocalStorage('contacts', []);

   function createContact(id, name) {
      setContacts(prevContacts => {
         return [...prevContacts, { id, name }]
      })
   }

   const value = { 
      contacts,
      createContact
   }

   return (
      <ContactContext.Provider value={value}>
         {children}
      </ContactContext.Provider>
   )
}
