import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { useContact } from '../../contexts/ContactContext'

export default function Contact() {
   const { contacts } = useContact();

   return (
      <ListGroup variant="flush">
         {
            contacts.map(contact => 
               <ListGroup.Item key={contact.id}>
                  {contact.name}
               </ListGroup.Item>
            )
         }
      </ListGroup>
   )
}
