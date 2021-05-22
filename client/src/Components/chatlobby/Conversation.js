import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { useConversation } from '../../contexts/ConversationContext'

export default function Conversation() {
   const { conversations, selectConversationIndex } = useConversation();

   return (
      <ListGroup variant="flush">
         {
            conversations.map((conversation, index) => 
               <ListGroup.Item
                  key={index}
                  active={conversation.selected}
                  onClick={() => selectConversationIndex(index)}
                  action
               >
                  {
                     conversation.recipients.map(recipient => {
                        return recipient.name
                     }).join(', ')
                  }
               </ListGroup.Item>
            )
         }
      </ListGroup>
   )
}
