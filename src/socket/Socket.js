import { io } from 'socket.io-client';

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:3001'; // Use your backend URL
export const socket = io("http://localhost:3001/tracking?room_id=shipment_2&user_type=1&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjM0NSwiaWF0IjoxNzMyNjI3NzYxLCJleHAiOjE3MzUyMTk3NjF9.bZjkvoa86PfMGQyyxj_N7yN52fW4JsnBSCO5Cmezz8o", {
  transports: ['websocket'], // Configure transports for socket connection
});

socket.on('connect', () => {
  console.log('Socket connected:', socket.id);
});

socket.on('disconnect', () => {
  console.log('Socket disconnected');
});
