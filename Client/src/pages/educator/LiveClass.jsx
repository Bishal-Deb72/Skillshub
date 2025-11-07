import React, { useContext, useState } from "react";
import JitsiMeet from "../../components/Live_class/JitsiMeet";
import { AppContext } from "../../context/AppContext";

const LiveClass = () => {

  const {backendUrl, getToken} = useContext(AppContext)
  const [roomName, setRoomName] = useState("Math101-Lecture1");
  const user = {
    name: "Teacher Name",  // Replace with dynamic user data
    email: "teacher@example.com",
  };

  const liveClass = async () => {
    const token = await getToken()
    
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Live Class</h1>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Room Name:</label>
        <input
          type="text"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <JitsiMeet roomName={roomName} user={user} />
    </div>
  );
};

export default LiveClass;