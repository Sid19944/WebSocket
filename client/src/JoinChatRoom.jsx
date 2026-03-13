import React, { useEffect } from "react";
import { useState } from "react";
import SecurityIcon from "@mui/icons-material/Security";
import EnhancedEncryptionIcon from "@mui/icons-material/EnhancedEncryption";
import ContactEmergencyIcon from "@mui/icons-material/ContactEmergency";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SdStorageIcon from "@mui/icons-material/SdStorage";
import PersonalVideoIcon from "@mui/icons-material/PersonalVideo";

function JoinChatRoom(props) {
  const data = new URLSearchParams(window.location.search);
  const roomId = data.get("roomId");

  useEffect(() => {
    if (roomId) {
      setTimeout(() => {
        props.setRoomId(roomId);
      }, 100);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onJoin();
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen overflow-hidden">
      <h1
        className="text-4xl flex font-serif bg-clip-text text-transparent textMove animate-spin drop-shadow-[0_0_20px_#0f23fa]"
        style={{
          backgroundImage: `linear-gradient(90deg, #a200ff, #fae30f, #0f23fa)`,
          animation: "moveSide 10s linear infinite",
        }}
      >
        JOIN CHAT ROOM
      </h1>
      <form className="flex flex-col p-3 gap-3 min-w-60 sm:w-[40%] w-[90%]">
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

      <div className="p-1 flex w-[90%] overflow-x-auto flex-nowrap scrollbar-hide gap-4 ">
        <div className="border bg-gray-900 p-2 w-60 shrink-0 rounded-lg shadow-[0_0_10px_#b700ff] flex flex-col justify-around items-center">
          <SecurityIcon style={{ fontSize: "40px" }} />A privacy-first,
          decentralized chat platform whestyle= re rooms are created on the
          fly—no accounts, no tracking, just secure conversation.
        </div>
        <div className="border bg-gray-900 p-2 w-60 shrink-0 rounded-lg shadow-[0_0_10px_#b700ff] flex flex-col justify-around items-center">
          <ContactEmergencyIcon style={{ fontSize: "40px" }} />
          Zero-Identity Entry: Users join via a unique Room ID and a temporary
          display name. No email, no OAuth, and no personal data stored.
        </div>
        <div className="border bg-gray-900 p-2 w-60 shrink-0 rounded-lg shadow-[0_0_10px_#b700ff] flex flex-col justify-around items-center">
          <EnhancedEncryptionIcon style={{ fontSize: "40px" }} />
          End-to-End Encryption (E2EE): Leverages Web Crypto API to encrypt
          messages locally before they ever hit the wire. Not even the server
          can read your chats.
        </div>
        <div className="border bg-gray-900 p-2 w-60 shrink-0 rounded-lg shadow-[0_0_10px_#b700ff] flex flex-col justify-around items-center">
          <AccessTimeIcon style={{ fontSize: "40px" }} />
          Real-Time Sync: Powered by WebSockets (ws) for sub-millisecond
          latency. Experience "as-it-happens" typing and message delivery.
        </div>
        <div className="border bg-gray-900 p-2 w-60 shrink-0 rounded-lg shadow-[0_0_10px_#b700ff] flex flex-col justify-around items-center">
          <SdStorageIcon style={{ fontSize: "40px" }} />
          Volatile Storage: Chats exist only within the room's lifecycle. Once
          the session ends, the data vanishes, ensuring a zero-footprint digital
          shadow.
        </div>
        <div className="border bg-gray-900 p-2 w-60 shrink-0 rounded-lg shadow-[0_0_10px_#b700ff] flex flex-col justify-around items-center">
          <PersonalVideoIcon style={{ fontSize: "40px" }} />
          Room Isolation: Complete logical separation between rooms; data never
          leaks across IDs.
        </div>
      </div>
    </div>
  );
}

export default JoinChatRoom;
