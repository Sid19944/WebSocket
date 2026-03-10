import { WebSocketServer } from "ws";

const wsServer = new WebSocketServer({
  port: 3001,
});

wsServer.on("connection", (socket) => {
  console.log("connection established");
  socket.on("message", (data) => {
    const b = Buffer.from(data).toString()
    console.log(b);
    socket.send(`${data}`)
  });
});
