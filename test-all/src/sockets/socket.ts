import { Server } from "socket.io";
import http from "http";

// I keep Socket.IO setup separate so real-time logic does not pollute server.ts.
export const initializeSocket = (server: http.Server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    socket.emit("connected", {
      message: "Connected to real-time server",
      socketId: socket.id,
    });

    socket.on("disconnect", () => {
      console.log(`Socket disconnected: ${socket.id}`);
    });
  });

  return io;
};