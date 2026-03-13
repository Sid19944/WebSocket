import { Server } from "socket.io";
import express from "express";
const app = express();
const PORT = 3000;

const httpServer = app.listen(PORT, () => {
  console.log(`App is listning on PORT ${PORT}`);
});

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

app.get("/keep-awaik", (req, res) => {
  return res.status(200).json({
    message: "Serv is on",
  });
});

io.on("connection", (socket) => {
  console.log(`User : ${socket.id} is connected`);

  // handle a user join room
  socket.on("user_join_room", (data) => {
    const { roomId, username } = data;
    socket.join(roomId);

    socket.emit("message", {
      username,
      text: `Welcome to Chat Room`,
      type: "notify",
    });

    socket
      .to(roomId)
      .emit("user_join_room", `${username} has joined the Chat Room`);
  });

  // brodcast the message
  socket.on("send_message", ({ username, roomId, text }) => {
    if (text.trim() != "") {
      console.log(text);
      socket.to(roomId).emit("message", { username, text, type: "regular" });
    }
  });

  // handle user leave room
  socket.on("user_left_chat_room", ({ username, roomId }) => {
    socket.to(roomId).emit("message", {
      username,
      text: `${username} has left Char Room`,
      type: "notify",
    });
  });

  // handle user Typing
  socket.on("user_typing", ({ username, roomId }) => {
    socket.to(roomId).emit("user_typing", {
      username,
    });
  });
});
