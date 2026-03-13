import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ShareIcon from "@mui/icons-material/Share";

function ChatRoom({ username, roomId, socket }) {
  const messageEndRef = useRef(null);
  const [currentMsg, setCurrentMsg] = useState("");
  const [messages, setMessages] = useState([]);
  const [activity, setActivity] = useState(false);

  const handelInputChange = (e) => {
    setCurrentMsg(e.target.value);

    socket.emit("user_typing", { username, roomId });
  };

  const scroolToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scroolToBottom();
  }, [messages]);

  const handleSendMesssage = (e) => {
    e.preventDefault();
    // add the message obj to the messages array

    if (currentMsg.trim() == "") return;
    setMessages((prev) => [
      ...prev,
      {
        id: uuidv4(),
        username,
        text: currentMsg,
        time: `${new Date().getHours()} : ${new Date().getMinutes()}`,
      },
    ]);

    // broadcast message to everyone else in the room
    socket.emit("send_message", {
      username,
      roomId,
      text: currentMsg,
    });
    setCurrentMsg("");
  };

  useEffect(() => {
    socket.on("message", ({ username, text, type }) => {
      setMessages((prev) => [
        ...prev,
        {
          id: uuidv4(),
          username,
          text,
          type,
          time: `${new Date().getHours()} : ${new Date().getMinutes()}`,
        },
      ]);
    });

    return () => {
      socket.off("message");
    };
  }, [socket]);

  useEffect(() => {
    socket.on("user_join_room", (message) => {
      console.log(message);
      setMessages((prev) => [
        ...prev,
        {
          id: uuidv4(),
          text: message,
          type: "notify",
        },
      ]);
    });

    return () => socket.off("user_join_room");
  }, [socket]);

  useEffect(() => {
    const handleBeForUnload = (e) => {
      socket.emit("user_left_chat_room", { username, roomId });
    };

    window.addEventListener("beforeunload", handleBeForUnload);

    return () => window.addEventListener("beforeunload", handleBeForUnload);
  }, [socket]);

  useEffect(() => {
    // user typing
    let timer;
    socket.on("user_typing", ({ username }) => {
      setActivity(`${username} is typing`);
      clearTimeout(timer);
      timer = setTimeout(() => {
        setActivity("");
      }, 2000);
    });

    return () => {
      socket.off("user_typing");
    };
  });

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Join my Private Chat!",
          text: `Join this secure room using my Link ${window.location.href}`,
        });
        console.log("Shared successfully");
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      // 2. Fallback: If not supported (like on some Desktop browsers)
      alert(
        "Sharing is not supported on this browser. Copy the link manually!",
      );
    }
  };

  return (
    <div className="h-[90vh] justify-center items-center flex flex-col gap-2">
      <div className="flex flex-col gap-1 justify-center items-center font-semibold">
        <div className="flex gap-3 items-center">
          <h1 className="text-3xl">Room ID : {roomId} </h1>
          <button className="border flex active:bg-purple-500 h-fit items-center justify-center gap-2 px-2 text-sm rounded-lg" onClick={handleShare}>
            <ShareIcon style={{fontSize : "15px"}}/>
            Share
          </button>
        </div>
        <h1 className="text-xl">
          Welcome{" "}
          <span className="text-purple-500 font-serif font-light">
            {username}
          </span>
        </h1>
        <h1
          style={{ fontSize: "12px", color: "gray" }}
          className="border rounded-lg px-3"
        >
          🔔 Don't refresh/leave the page to stay in the Room
        </h1>
      </div>
      <div className="h-[80vh] shadow-[0px_0px_3px_3px] shadow-black w-[80%] rounded-lg bg-gray-900 p-2 flex flex-col gap-1 overflow-auto">
        {messages.map((message) => {
          const { id, type, text } = message || {};
          if (type == "notify") {
            return (
              <div
                key={id}
                className="text-center rounded-lg text-xs text-gray-500 font-semibold"
              >
                {text}
              </div>
            );
          } else {
            return (
              <div
                key={id}
                className={`flex flex-col rounded-lg w-2/3 p-1  ${message.username == username ? "ml-auto " : ""}`}
              >
                <span
                  className={`text-xs text-blue-400 ${message.username == username ? "text-end" : "text-start"}`}
                  style={{ fontSize: "9px" }}
                >
                  {message.username}
                </span>

                <span
                  className={`text-md flex justify-between w-full px-2 ${message.username == username ? "ml-auto bg-gray-600 rounded-br-2xl rounded-tl-2xl" : "bg-purple-600 rounded-tr-2xl rounded-bl-2xl"}`}
                >
                  {text}
                </span>
                <span
                  style={{ fontSize: "6px" }}
                  className={` ${message.username == username ? "ml-auto" : "mr-auto"}`}
                >
                  {message.time}
                </span>
              </div>
            );
          }
        })}

        <div
          ref={messageEndRef}
          className="mt-auto text-center text-xs text-gray-400"
        >
          {activity}
        </div>
      </div>
      <form className="flex w-[80%] gap-2">
        <input
          type="text"
          placeholder="Enter Message"
          className="border w-full p-1 rounded-lg"
          value={currentMsg}
          onChange={handelInputChange}
          onKeyDown={() => setActivity(true)}
        />
        <button
          className="border w-30 rounded-lg bg-purple-600 active:bg-purple-800 cursor-pointer"
          onClick={handleSendMesssage}
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default ChatRoom;
