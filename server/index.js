const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const path = require("path");
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

app.get("/", (req, res) => {
  app.use(express.static(path.resolve(__dirname, "client", "dist")));
  res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
});

server.listen(port, () => {
  console.log("server is up at port: ", port);
});
