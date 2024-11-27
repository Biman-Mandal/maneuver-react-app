import React, { createContext, useState, useEffect } from "react";
import { io } from "socket.io-client";

// Create Context
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const socketBaseUrl  = process.env.REACT_APP_NODE_APP_BASE_URL
  const token = process.env.REACT_APP_VALID_URL_TOKEN;
  const shipmentRoomId = process.env.REACT_APP_SHIPMENT_ROOM_ID
  console.log("123123")
  console.log(socketBaseUrl)
  console.log(token)
  console.log(shipmentRoomId)
  console.log( process.env.REACT_APP_GOOGLE_MAPS_KEY)
  const socketUrl = `${socketBaseUrl}/tracking?room_id=${shipmentRoomId}&user_type=1&token=${token}`// "http://localhost:3001/tracking?room_id=shipment_2&user_type=1&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjM0NSwiaWF0IjoxNzMyNjI3NzYxLCJleHAiOjE3MzUyMTk3NjF9.bZjkvoa86PfMGQyyxj_N7yN52fW4JsnBSCO5Cmezz8o"
  console.log(socketUrl)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [socket, setSocket] = useState(null);
  const [allDriverLocation, setAllDriverLocation] = useState(null); // To store data received from the server

  // Check if the user is authenticated (based on localStorage token)
  const checkAuth = () => {
    const token = localStorage.getItem("auth_token");
    setIsAuthenticated(!!token); // Set true if token exists
  };

  useEffect(() => {
    checkAuth(); // Check on initial render
  }, []);

  // Connect to Socket.IO only after login
  const connectSocket = () => {
    const socketInstance = io(socketUrl);

    socketInstance.on("connect", () => {
      console.log("Connected to Socket.IO server");
    });

    // Listen for real-time data updates
    socketInstance.on("receive_all_driver_information", (data) => {
      setAllDriverLocation(data); // Update the data when server sends an update
    });

    // Set the socket instance to state
    setSocket(socketInstance);
  };

  // Disconnect Socket.IO if logged out or if no token
  const disconnectSocket = () => {
    if (socket) {
      socket.disconnect();
      console.log("Disconnected from Socket.IO server");
    }
  };

  // Login function
  const login = (token) => {
    localStorage.setItem("auth_token", token); // Save token to localStorage
    setIsAuthenticated(true); // Update state
    connectSocket(); // Connect to Socket.IO only on login
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("auth_token"); // Remove token from localStorage
    setIsAuthenticated(false); // Update state
    disconnectSocket(); // Disconnect Socket.IO only on logout
  };

  // Ensure socket connection persists when the user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      if (!socket) {
        connectSocket(); // Connect socket if authenticated
      }
    } else {
      disconnectSocket(); // Disconnect socket if not authenticated
    }
  }, [isAuthenticated]); // This effect will run whenever isAuthenticated changes

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, socket, allDriverLocation }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
