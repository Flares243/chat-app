import React, { useRef } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { useContact } from '../../contexts/ContactContext'

export default function NewContactModal({ closeModal }) {
   const idRef = useRef();
   const nameRef = useRef();
   const { createContact } = useContact();

   function handleSubmit(e) {
      e.preventDefault();

      createContact(idRef.current.value, nameRef.current.value);
      closeModal();
   }

   return (
      <Form onSubmit={handleSubmit}>
         <Modal.Header closeButton>
            <h5>New contact information:</h5>
         </Modal.Header>
         <Modal.Body>
               <Form.Group className="d-flex flex-column">
                  <Form.Label>ID:</Form.Label>
                  <Form.Control type="text" ref={idRef} required></Form.Control>
               </Form.Group>
               <Form.Group className="d-flex flex-column">
                  <Form.Label>Name:</Form.Label>
                  <Form.Control type="text" ref={nameRef} required></Form.Control>
               </Form.Group>
         </Modal.Body>
         <Modal.Footer>
            <Button type="submit" varient="primary">Create</Button>
         </Modal.Footer>
      </Form>
   )
}
