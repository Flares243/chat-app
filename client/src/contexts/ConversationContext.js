import React, { useContext, useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { useContact } from '../contexts/ContactContext'

const ConversationsContext = React.createContext();

export function useConversation() {
   return useContext(ConversationsContext);
}

export function ConversationsProvider({ id, children }) {
   const [conversations, setConversations] = useLocalStorage('conversations', []);
   const [selectedConversationIndex, setSelectedConversationIndex] = useState(0);
   const { contacts } = useContact();

   function createConversation(recipients) {
      setConversations(prevConversations => {
         return [...prevConversations, { recipients, messages: [] }]
      })
   }

   function addMessageToConversation({ recipients, text, sender }) {

   }

   function sendMessage(recipient, text) {
      addMessageToConversation({ recipient, text, sender: id });
   }

   const formattedConversations = conversations.map((conversation, index) => {
      const recipients = conversation.recipients.map(recipient => {
         const contact = contacts.find(contact => {
            return contact.id === recipient
         })

         const name = contact ? contact.name : recipient;

         return { id: recipient, name: name }
      })

      const selected = index === selectedConversationIndex

      return {
         ...conversation,
         recipients: recipients,
         selected: selected
      }
   })

   const value = {
      conversations: formattedConversations,
      createConversation,
      selectedConversation: formattedConversations[selectedConversationIndex],
      selectConversationIndex: setSelectedConversationIndex
   }

   return (
      <ConversationsContext.Provider value={value}>
         {children}
      </ConversationsContext.Provider>
   )
}
