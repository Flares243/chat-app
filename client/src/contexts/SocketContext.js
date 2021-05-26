import React, { useContext, useEffect, useState } from 'react'

const io = require('socket.io-client');
const SocketContext = React.createContext();

export function useSocket() {
   return useContext(SocketContext);
}

export function SocketProvider({ children, id }) {
   const [socket, setSocket] = useState();

   useEffect(() => {
      const newSocket = io('ws://localhost:8888', { 
         query: { id }
      });
      setSocket(newSocket);

      return () => newSocket.close();
   }, [id])

   const value = {
      socket
   }

   return (
      <SocketContext.Provider value={value}>
         { children }
      </SocketContext.Provider>
   )
}
