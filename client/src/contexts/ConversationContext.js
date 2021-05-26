import React, { useContext, useEffect, useState, useCallback } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import arrayEquality from '../commonlyuse/ArrayEquality'
import { useContact } from '../contexts/ContactContext'
import { useSocket } from './SocketContext';

const ConversationsContext = React.createContext();

export function useConversation() {
   return useContext(ConversationsContext);
}

export function ConversationsProvider({ id, children }) {
   const [conversations, setConversations] = useLocalStorage('conversations', []);
   const [selectedConversationIndex, setSelectedConversationIndex] = useState(0);
   const { contacts } = useContact();
   const { socket } = useSocket();

   function createConversation(recipients) {
      setConversations(prevConversations => {
         return [
            ...prevConversations,
            { recipients, messages: [] }
         ]
      })
   }

   const addMessageToConversation = useCallback(({ recipients, text, sender }) => {
      setConversations(prevConversations => {
         let isChanged = false;
         const newMessage = { sender, text };
         const newConversations = prevConversations.map(conversation => {
            if (arrayEquality(conversation.recipients, recipients)) {
               isChanged = true;
               return {
                  ...conversation,
                  messages: [ ...conversation.messages, newMessage ]
               }
            }

            return conversation;
         })

         if (isChanged) {
            return newConversations;
         }
         else {
            return [
               ...prevConversations,
               { recipients, messages: [newMessage]}
            ] 
         }
      })
   }, [setConversations])

   function sendMessage(recipients, text) {
      socket.emit('send-message', { recipients, text });

      addMessageToConversation({ recipients, text, sender: id });
   }

   useEffect(() => {
      if (socket == null) return;

      socket.on('receive-message', addMessageToConversation);

      return () => socket.off('receive-message');
   }, [socket, addMessageToConversation])

   const formattedConversations = conversations.map((conversation, index) => {
      const recipients = conversation.recipients.map(recipient => {
         const contact = contacts.find(contact => {
            return contact.id === recipient
         })

         const name = contact ? contact.name : recipient;

         return { id: recipient, name: name }
      })

      const messages = conversation.messages.map(message => {
         const contact = contacts.find(contact => {
            return contact.id === message.sender
         })

         const name = contact ? contact.name : message.sender;
         const fromMe = id === message.sender;
         
         return { ...message, senderName: name, fromMe: fromMe }
      })

      const selected = index === selectedConversationIndex

      return {
         ...conversation,
         recipients: recipients,
         messages: messages,
         selected: selected
      }
   })

   const value = {
      conversations: formattedConversations,
      selectedConversation: formattedConversations[selectedConversationIndex],
      createConversation,
      selectConversationIndex: setSelectedConversationIndex,
      sendMessage,
   }

   return (
      <ConversationsContext.Provider value={value}>
         {children}
      </ConversationsContext.Provider>
   )
}