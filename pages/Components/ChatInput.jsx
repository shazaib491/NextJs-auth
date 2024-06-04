// components/ChatInput.js
import  { useState } from 'react';
import {socket} from "./../../socket";
import { getSession } from 'next-auth/react';


const ChatInput = () => {

  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSend = () => {
    if (inputValue.trim()) {
      publishMessage(inputValue)
      setInputValue('');
    }
  };

  async function publishMessage(message){
    try {
        const session = await getSession();
        socket.emit("usersGroup",{message:message,email:session.user.email});  
    } catch (error) {
            console.log(error)
    }
 
  }

  return (
    <div className="flex space-x-2">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        className="flex-1 p-2 border border-gray-300 rounded-l"
        placeholder="Type a message..."
      />
      <button
        onClick={handleSend}
        className="bg-blue-500 text-white p-2 rounded-r"
      >
        Send
      </button>
    </div>
  );
};

export default ChatInput;
