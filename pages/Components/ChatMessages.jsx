
const ChatMessages = ({ messages }) => {
  return (
    <div className="space-y-2">
      {messages.map((message, index) => (
        <div key={index} className="bg-white p-3 rounded shadow-sm">
          <div className="text-gray-700">{message.sender}</div>
          <div className="text-gray-900">{message.text}</div>
        </div>
      ))}
    </div>
  );
};

export default ChatMessages;
