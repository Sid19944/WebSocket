import React from "react";
import { useState } from "react";

function JoinChatRoom(props) {
  const handleSubmit = (e) => {
    e.preventDefault();
    props.onJoin();
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1
        className="text-4xl font-serif bg-clip-text text-transparent textMove animate-spin drop-shadow-[0_0_20px_#0f23fa]"
        style={{
          backgroundImage: `linear-gradient(90deg, #a200ff, #fae30f, #0f23fa)`,
          animation: "moveSide 10s linear infinite",
        }}
      >
        JOIN CHAT ROOM
      </h1>
      <form className="flex flex-col p-3 gap-3 min-w-60 w-[40%]">
        <input
          className="bg-gray-950 p-2 rounded-lg outline-none"
          type="text"
          placeholder="Enter Your Name"
          value={props.username}
          onChange={(e) => props.setUsername(e.target.value)}
        />
        <input
          className="bg-gray-950 p-2 rounded-lg outline-none"
          type="text"
          placeholder="Enter Room ID"
          value={props.roomId}
          onChange={(e) => props.setRoomId(e.target.value)}
        />
        <button
          className="border p-2 rounded-lg bg-blue-500 cursor-pointer disabled:bg-gray-500"
          type="submit"
          onClick={handleSubmit}
          disabled={!props.username || !props.roomId}
        >
          Join Room Now
        </button>
      </form>
    </div>
  );
}

export default JoinChatRoom;
