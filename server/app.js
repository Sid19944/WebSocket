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

io.on("connection", (socket) => {
  console.log(`User : ${socket.id} is connected`);

  // handle a user join room
  socket.on("user_join_room", (data) => {
    const { roomId, username } = data;
    socket.join(roomId);

    socket
      .to(roomId)
      .emit("user_join_room", `${username} has joined the Chat Room`);
  });

  // brodcast the message
  socket.on("send_message", ({ username, roomId, text }) => {
    socket.to(roomId).emit("message", { username, text, type: "regular" });
  });

  // handle user leave room
  socket.on("user_left_chat_room", ({ username, roomId }) => {
    socket
      .to(roomId)
      .emit("message", {
        username,
        text: `${username} has left Char Room`,
        type: "notify",
      });
  });

  // handle user Typing
  socket.on("user_typing", ({ username, roomId }) => {
    socket
      .to(roomId)
      .emit("user_typing", {
        username,
      });
  });
});
