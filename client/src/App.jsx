import React from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

const App = () => {

  const [userName, setUserName] = useState("");
  const [chatActive, setChatActive] = useState(false);

  return (
    <>
      <div className="w-screen h-screen bg-gray-300"></div>
    </>
  );
};

export default App;
