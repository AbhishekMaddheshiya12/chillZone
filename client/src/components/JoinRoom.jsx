import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const JoinRoom = () => {
  const [room, setRoom] = useState("general");
  const navigate = useNavigate();

  const handleJoin = () => {
    navigate(`/chat/${room}`);
  };

  return (
    <div>
      <h1>Join Room</h1>
      <input
        type="text"
        placeholder="Room Name"
        value={room}
        onChange={(e) => setRoom(e.target.value)}
      />
      <button onClick={handleJoin}>Join</button>
    </div>
  );
};

export default JoinRoom;
