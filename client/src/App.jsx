import React from "react";
import { useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

const App = () => {
  const [username, setUserName] = useState("");
  const [chatActive, setChatActive] = useState(false);

  return (
    <>
      <div className="flex items-center justify-center w-screen h-screen bg-gray-100">
        {chatActive ? (
          <div>
            <h1>Squad Chat</h1>
            <div>
              <div></div>
              <form className="flex gap-2 md:gap-4">
                <input
                  type="text"
                  placeholder="Type your message ..."
                  className="px-3 py-2 border-2 rounded-md outline-none"
                />
                <button
                  type="text"
                  className="px-3 py-2 font-bold bg-green-500 rounded-md"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center w-screen h-screen gap-2">
            <input
              type="text"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              className="px-3 py-2 text-center border-2 rounded-md outline-none"
            />
            <button
              type="submit"
              className="px-3 py-2 font-bold text-white bg-green-500 rounded-md"
              onClick={() => !username == "" && setChatActive(true)}
            >
              Start Chat
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default App;
