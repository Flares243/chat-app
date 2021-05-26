import React, { useRef } from 'react'
import { Container, Form, Card, Button } from 'react-bootstrap';
import CenteredContainer from '../../commonlyuse/CenteredContainer';
import { v4 as uuidV4 } from 'uuid'

export default function Login({ onIdSubmit }) {
   const idRef = useRef();
   // const passwordRef = useRef();

   function handleSubmit(e) {
      e.preventDefault();
      onIdSubmit(idRef.current.value.trim());
   }

   function CreateNewID() {
      onIdSubmit(uuidV4());
   }

   return (
      <CenteredContainer>
         <Container className="w-100 w-card">
            <Card>
               <Card.Body>
                  <h2 className="text-center w-100 mb-4">Log In</h2>
                  <Form onSubmit={handleSubmit}>
                     <Form.Group>
                        <Form.Label>Enter your ID:</Form.Label>
                        <Form.Control type="text" ref={idRef} required />
                     </Form.Group>
                     {/* <Form.Group>
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type="password" ref={passwordRef} required />
                     </Form.Group>
                     <Button className="w-100 mt-2" type="submit">Log in</Button>*/}
                     <Button className="w-100 mt-2" type="submit" onClick={CreateNewID} variant="secondary">Create a new ID</Button>
                  </Form>
               </Card.Body>
            </Card>
         </Container>
      </CenteredContainer>
   )
}
