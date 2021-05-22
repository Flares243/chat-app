import React, { useState } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'
import { useConversation } from '../../contexts/ConversationContext'

export default function ChatRoom() {
   const [text, setText] = useState();
   const { sendMessage, selectedConversation } = useConversation();

   function handleSubmit(e) {
      e.preventDefault();

      sendMessage(
         selectedConversation.recipients.map(recipient => recipient.id),
         text
      );
      
      setText('');
   }

   return (
      <div className="d-flex flex-column flex-grow-1">
         <div className="flex-grow-1 overflow-auto">

         </div>

         <Form onSubmit={handleSubmit}>
            <Form.Group className="m-2">
               <InputGroup>
                  <Form.Control
                     as="textarea"
                     rows="1"
                     required
                     value={text}
                     placeholder="Message..."
                     onChange={ e => setText(e.target.value) }
                     className="hide-scrollbar p-2"
                     style={{ resize: 'none' }}
                  />
                  <InputGroup.Append>
                     <Button type="submit">Send</Button>
                  </InputGroup.Append>
               </InputGroup>
            </Form.Group>
         </Form>
      </div>
   )
}
