import React from 'react'
import Login from './authentication/Login.js'
import Dashboard from './chatlobby/Dashboard.js'
import useLocalStorage from '../hooks/useLocalStorage.js'
import { ContactsProvider } from '../contexts/ContactContext'
import { ConversationsProvider } from '../contexts/ConversationContext.js'
import { SocketProvider } from '../contexts/SocketContext.js'

export default function App() {
   const [id, setId] = useLocalStorage('id');
   
   const dashboard = (
      <ContactsProvider>
         <SocketProvider id={id}>
            <ConversationsProvider id={id}>
               <Dashboard id={id} />
            </ConversationsProvider>
         </SocketProvider>
      </ContactsProvider>
   )

   return (
      id ? dashboard : <Login onIdSubmit={setId} />
   )
}