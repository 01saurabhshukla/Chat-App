const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const port = 5000;
const { Server } = require("socket.io");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User connected : ${socket.id}`);

  socket.on("send-message", (message) => {
    
    // Broadcast the message to all the connected users
    io.emit("received-message", message);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected");
  });
});

server.listen(port, () => {
  console.log("server is up at port: ", port);
});
