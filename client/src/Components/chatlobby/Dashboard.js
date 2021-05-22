import SideBar from './SideBar.js'
import { useConversation } from '../../contexts/ConversationContext'
import ChatRoom from './ChatRoom.js';

export default function Dashboard({ id }) {
   const { selectedConversation } = useConversation();

   return (
      <div className="d-flex h-100vh">
         <SideBar id={id} />
         { selectedConversation && <ChatRoom /> }
      </div>
   )
}