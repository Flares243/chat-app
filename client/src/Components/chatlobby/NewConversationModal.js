import React, { useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { useContact } from '../../contexts/ContactContext'
import { useConversation } from '../../contexts/ConversationContext'

export default function NewConversationModal({ closeModal }) {
   const { contacts } = useContact();
   const [ selectedContactIds, setSelectedContactIds ] = useState([]);
   const { createConversation } = useConversation();

   function handleSubmit(e) {
      e.preventDefault();
      if (selectedContactIds) {
         createConversation(selectedContactIds);
      }
      closeModal();
   }

   function handleCheckBoxChange(contactId) {
      setSelectedContactIds(prevSelectedContactIds => {
         if (prevSelectedContactIds.includes(contactId)) {
            return prevSelectedContactIds.filter(prevContactId => {
               return prevContactId !== contactId
            })
         }
         else {
            return [...prevSelectedContactIds, contactId]
         }
      })
   }

   return (
      <Form onSubmit={handleSubmit}>
         <Modal.Header closeButton>
            <h5>Select users to join:</h5>
         </Modal.Header>
         <Modal.Body>
            <div className="d-flex flex-column h-300px overflow-auto custom-scrollbar">
               {
                  contacts.map((contact, index) => (
                     <Form.Group controlId={contact.id} key={index}>
                        <Form.Check
                           type="checkbox"
                           value={selectedContactIds.includes(contact.id)}
                           label={contact.name}
                           onChange={() => handleCheckBoxChange(contact.id)}
                        />
                     </Form.Group>
                  ))
               }
            </div>
         </Modal.Body>
         <Modal.Footer>
            <Button type="submit" varient="primary">Create</Button>
         </Modal.Footer>
      </Form>
   )
}
