import React, { useState } from 'react'
import { Nav, Tab, Button, Modal } from 'react-bootstrap'
import Contact from './Contact';
import Conversation from './Conversation';
import NewConversationModal from './NewConversationModal';
import NewContactModal from './NewContactModal';

const CONVERSATION_KEY = "conversation";
const CONTACT_KEY = "contact";

export default function SideBar({ id }) {
   const [activeKey, setActiveKeyKey] = useState(CONVERSATION_KEY);
   const [isModalOpen, setIsModalOpen] = useState(false);

   var isConversation = activeKey === CONVERSATION_KEY;

   function closeModal() {
      setIsModalOpen(false);
   }

   return (
      <div className="d-flex flex-column w-sidebar">
         <Tab.Container activeKey={activeKey} onSelect={setActiveKeyKey} transition={false}>
            <Nav variant="tabs" className="justify-content-center">
               <Nav.Item>
                  <Nav.Link eventKey={CONVERSATION_KEY}>Conversation</Nav.Link>
               </Nav.Item>
               <Nav.Item>
                  <Nav.Link eventKey={CONTACT_KEY}>Contact</Nav.Link>
               </Nav.Item>
            </Nav>
            <Tab.Content className="border-right overflow-auto flex-grow-1">
               <Tab.Pane eventKey={CONVERSATION_KEY}>
                  <Conversation />
               </Tab.Pane>
               <Tab.Pane eventKey={CONTACT_KEY}>
                  <Contact />
               </Tab.Pane>
            </Tab.Content>
            <div className="border-top border-right p-1 small">
               Your ID: <span className="text-muted">{id}</span>
            </div>
            <Button className="rounded-0" onClick={() => setIsModalOpen(true)}>
               New {isConversation ? 'Conversation' : 'Contact'}
            </Button>
            <Modal show={isModalOpen} onHide={closeModal} backdrop="static">
               {
                  isConversation ? 
                  <NewConversationModal closeModal={closeModal} /> :
                  <NewContactModal closeModal={closeModal} />
               }
            </Modal>
         </Tab.Container>
      </div>
   )
}
