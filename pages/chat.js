// components/ChatApp.js
import { useEffect, useState } from "react";
import ChatInput from './Components/ChatInput';
import ChatMessages from './Components/ChatMessages';
import {socket} from "./../socket";

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");

  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);

      socket.io.engine.on("upgrade", (transport) => {
        setTransport(transport.name);
      });
    }

    function onDisconnect() {
      setIsConnected(false);
      setTransport("N/A");
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("usersGroup", onUsersGroup);


    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  const onUsersGroup = (msg) => {
    setMessages((prev) => {
      if (prev.some((message) => message.text === msg.message)) {
        return prev;
      }
      return [...prev, { text: msg.message, sender: msg.email }];
    });
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
    <header className="bg-blue-500 text-white p-4 text-center">
      <h1 className="text-2xl">Chat App</h1>
    </header>
    <main className="flex-1 p-4 overflow-y-auto">
      <p>Status: {isConnected ? 'connected' : 'disconnected'}</p>
      <p>Transport: {transport}</p>
      <ChatMessages messages={messages}  />
    </main>
    <footer className="p-4">
      <ChatInput  />
    </footer>
  </div>

  );
};

export default ChatApp;
