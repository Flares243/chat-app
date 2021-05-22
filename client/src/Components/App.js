import React from 'react'
import Login from './authentication/Login.js'
import Dashboard from './chatlobby/Dashboard.js'
import useLocalStorage from '../hooks/useLocalStorage.js'
import { ContactsProvider } from '../contexts/ContactContext'
import { ConversationsProvider } from '../contexts/ConversationContext.js'

export default function App() {
   const [id, setId] = useLocalStorage('id');
   
   const dashboard = (
      <ContactsProvider>
         <ConversationsProvider id={id}>
            <Dashboard id={id} />
         </ConversationsProvider>
      </ContactsProvider>
   )

   return (
      id ? dashboard : <Login onIdSubmit={setId} />
   )
}