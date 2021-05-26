import React, { useState, useRef, useCallback } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'
import { useConversation } from '../../contexts/ConversationContext'

export default function ChatRoom() {
   const [text, setText] = useState();
   const { sendMessage, selectedConversation } = useConversation();
   const formRef = useRef();
   const setRef = useCallback((node) => {
      if (node) {
         node.scrollIntoView({ smooth: true });
      }
   }, []);

   function handleKeyPress(e) {
      if (e.key === 'Enter' && !e.shiftKey){
         e.preventDefault();
         handleSubmit();
      }
   }

   function handleSubmit() {
      sendMessage(
         selectedConversation.recipients.map(recipient => recipient.id),
         text
      );
      
      setText('');
   }

   return (
      <div className="d-flex flex-column flex-grow-1 mx-2">
         <div className="flex-grow-1 overflow-auto custom-scrollbar mb-1">
            <div className="d-flex flex-column align-items-start justify-content-end px-3">
               {
                  selectedConversation.messages.map((message, index) => {
                     const lastMessage = selectedConversation.messages.length - 1 === index;
                     return (
                        <div
                           ref={lastMessage ? setRef : null}
                           key={message.sender + index}
                           className={`d-flex flex-column my-1
                              ${message.fromMe ? 'align-self-end align-items-end': 'align-items-start'}`}
                        >
                           <div
                              className={`rounded px-2 py-1
                              ${message.fromMe ? 'bg-primary text-white': 'border'}`}
                           >
                              {message.text}
                           </div>
                           <div
                              className={`text-muted small
                              ${message.fromMe ? 'text-right' : ''}`}
                           >
                              {message.fromMe ? 'You' : message.senderName}
                           </div>
                        </div>
                     )
                  })
               }
            </div>
         </div>

         <Form onSubmit={e => { e.preventDefault(); handleSubmit(); }} ref={formRef}>
            <Form.Group>
               <InputGroup>
                  <Form.Control
                     as="textarea"
                     rows="1"
                     required
                     value={text}
                     placeholder="Message..."
                     onChange={e => setText(e.target.value)}
                     onKeyDown={handleKeyPress}
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
