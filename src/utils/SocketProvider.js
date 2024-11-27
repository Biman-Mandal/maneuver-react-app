import React, { createContext, useState, useEffect } from "react";
import { socket } from "../socket/Socket"; // Import socket from socket.js

// Create context
const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  const [isSocketConnected, setIsSocketConnected] = useState(socket.connected);

  useEffect(() => {
    const onConnect = () => {
      setIsSocketConnected(true);
    };

    const onDisconnect = () => {
      setIsSocketConnected(false);
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isSocketConnected }}>
      {children}
    </SocketContext.Provider>
  );
};

export { SocketContext, SocketProvider };
