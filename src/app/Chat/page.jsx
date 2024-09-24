"use client"
// pages/chat.js
import { useState } from 'react';

export default function Chat() {
  const [messages, setMessages] = useState([]);

  const handleSend = (event) => {
    event.preventDefault();
    const message = event.target.message.value;
    setMessages([...messages, { sender: 'user', text: message }]);
    event.target.reset();
  };

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col text-black">
      <div className="max-w-lg w-full mx-auto bg-white p-4 shadow-md flex-1 overflow-y-auto">
        {messages.map((msg, index) => (
          <div key={index} className={`my-2 p-3 rounded-lg ${msg.sender === 'user' ? 'bg-blue-100 text-right' : 'bg-gray-100 text-left'}`}>
            {msg.text}
          </div>
        ))}
      </div>

      <form onSubmit={handleSend} className="w-full max-w-lg mx-auto p-4 bg-white flex space-x-2">
        <input type="text" name="message" className="flex-grow px-4 py-2 border rounded-lg focus:outline-none" placeholder="Type a message" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg">Send</button>
      </form>
    </div>
  );
}
