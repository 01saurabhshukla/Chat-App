import React from "react";
import { useEffect, useState, useRef } from "react";
import io from "socket.io-client";

const socket = io(`${window.location.origin}`);

const App = () => {
  const [username, setUserName] = useState("");
  const [chatActive, setChatActive] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    socket.on("received-message", (message) => {
      setMessages([...messages, message]);
      scrollToBottom();
    });
  }, [messages, socket]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const messageData = {
      message: newMessage,
      user: username,
      time:
        new Date(Date.now()).getHours() +
        ":" +
        new Date(Date.now()).getMinutes(),
    };

    if (!newMessage == "") {
      socket.emit("send-message", messageData);
    } else {
      alert("message cannot be empty");
    }

    setNewMessage("");
  };

  return (
    <>
      <div className="flex items-center justify-center w-screen h-screen bg-gray-100">
        {chatActive ? (
          <div className="w-full rounded-md md:w-[80vw] lg:w-[40vw] p-2">
            <h1 className="my-2 text-xl font-bold text-center uppercase">
              Squad Chat
            </h1>
            <div>
              <div className="overflow-scroll h-[80vh] lg:h-[60vh]">
                {messages.map((message, index) => {
                  return (
                    <div
                      key={index}
                      className={`flex my-5 rounded-md shadow-md w-fit ${
                        username === message.user && "ml-auto"
                      } `}
                    >
                      <div className="flex items-center justify-center bg-green-400 rounded-l-md">
                        <h3 className="px-2 text-lg font-bold ">
                          {message.user.charAt(0).toUpperCase()}
                        </h3>
                      </div>
                      <div className="px-2 bg-white rounded-md">
                        <span className="text-sm">{message.user}</span>
                        <h3 className="font-bold">{message.message}</h3>
                        <h3 className="text-xs text-right">{message.time}</h3>
                      </div>
                    </div>
                  );
                })}

                <div ref={messagesEndRef} />
              </div>
            </div>

            <form
              className="flex justify-between gap-2 md:gap-4"
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                value={newMessage}
                placeholder="Type your message ..."
                className="w-full rounded-md outline-none bofrder-2 p-y-2 "
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button
                type="text"
                className="px-3 py-2 font-bold bg-green-500 rounded-md"
              >
                Send
              </button>
            </form>
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
