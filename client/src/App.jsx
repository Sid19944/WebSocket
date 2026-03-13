import { useState } from "react";
import { io } from "socket.io-client";
import JoinChatRoom from "./JoinChatRoom";
import ChatRoom from "./ChatRoom";
import { useEffect } from "react";

// initializing the socket connection
const socket = io("https://websocket-ept8.onrender.com");

function App() {
  const [isHeRoom, setIsHeRoom] = useState(false);
  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState("");

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Socket connection has been connected");
    });

    return () => {
      socket.off("connect");
    };
  }, []);

  const handleJoinRoom = () => {
    // add user to room
    socket.emit("user_join_room", { username, roomId });
    // go to chat window
    setIsHeRoom(!isHeRoom);
  };

  return (
    <>
      {isHeRoom ? (
        <ChatRoom roomId={roomId} username={username} socket={socket}/>
      ) : (
        <JoinChatRoom
          onJoin={handleJoinRoom}
          username={username}
          setUsername={setUsername}
          roomId={roomId}
          setRoomId={setRoomId}
        />
      )}
    </>
  );
}

export default App;
