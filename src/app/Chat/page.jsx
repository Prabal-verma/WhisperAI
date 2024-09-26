"use client";
import 'regenerator-runtime/runtime';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Markdown from 'react-markdown';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'; // Import SpeechRecognition
import { FaMicrophone } from 'react-icons/fa';

export default function ChatPage() {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);

  // Speech recognition setup
  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  // Function to send the message
  const handleSendMessage = async () => {
    const messageToSend = inputValue.trim() !== '' ? inputValue : transcript;
    if (messageToSend === '') return;

    const newMessage = { text: messageToSend, sender: 'user', time: new Date().toLocaleString() };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputValue(''); // Reset input value
    resetTranscript(); // Reset transcript if used
    setIsLoading(true);

    try {
      // Fetch response from the Gemini API
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=YOUR_API_KEY`, // Replace with your actual API key
        method: 'POST',
        data: {
          contents: [
            {
              parts: [{ text: messageToSend }],
            },
          ],
        },
      });

      // Extract bot response
      const botResponse = { 
        text: response.data.candidates[0].content.parts[0].text, 
        sender: 'bot', 
        time: new Date().toLocaleString() 
      };

      setMessages((prevMessages) => [...prevMessages, botResponse]);
    } catch (error) {
      console.error('Error fetching bot response:', error);
      const errorMessage = { text: 'Oops! Something went wrong.', sender: 'bot', time: new Date().toLocaleString() };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle "Enter" key press to send a message
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  // Load chat history from localStorage on component mount
  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];
    setChatHistory(storedHistory);
  }, []);

  // Save messages to localStorage whenever messages change
  useEffect(() => {
    if (messages.length > 0) {
      const updatedHistory = [...chatHistory, ...messages];
      localStorage.setItem('chatHistory', JSON.stringify(updatedHistory));
    }
  }, [messages]);

  return (
    <div className="h-screen flex bg-gray-100">
      {/* Sidebar for chat history */}
      <Sidebar chatHistory={chatHistory} />

      {/* Main chat area */}
      <div className="flex-1 flex flex-col">
        <ChatWindow messages={messages} isLoading={isLoading} />
        <ChatInput 
          inputValue={inputValue} 
          setInputValue={setInputValue} 
          handleSendMessage={handleSendMessage} 
          handleKeyPress={handleKeyPress} 
          transcript={transcript} // Pass the transcript for voice input
          listening={listening} // Check if the user is currently speaking
          resetTranscript={resetTranscript} // Function to reset the transcript
        />
      </div>
    </div>
  );
}

function Sidebar({ chatHistory }) {
  return (
    <div className="w-1/4 bg-gray-100 text-gray-700 p-4 shadow-lg flex flex-col mt-[10vh]">
      <h2 className="text-xl font-semibold mb-4">Chat History</h2>
      <button className="bg-blue-600 text-white py-2 px-4 mb-4 rounded-lg hover:bg-blue-500 transition duration-200">
        New Chat
      </button>
      <div className="space-y-2 overflow-y-scroll h-[60vh]">
        {chatHistory.length > 0 ? (
          chatHistory.map((chat, index) => (
            <div key={index} className="p-3 bg-gray-200 rounded-lg hover:bg-gray-300 transition duration-200">
              <p className="text-sm"><Markdown>{chat.text}</Markdown></p>
              <p className="text-xs text-gray-400">{chat.time}</p>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500">No chat history available</p>
        )}
      </div>
    </div>
  );
}

function ChatWindow({ messages, isLoading }) {
  return (
    <div className="flex-1 p-6 bg-white flex flex-col space-y-4 overflow-y-auto mt-[10vh]">
      {messages.map((msg, index) => (
        <div key={index} className={`p-4 rounded-lg shadow-md max-w-lg ${msg.sender === 'user' ? 'bg-blue-500 text-white self-end' : 'bg-gray-100 text-black self-start'}`}>
          <p><Markdown>{msg.text}</Markdown></p>
          <p className="text-xs font-sans mt-1">{msg.time}</p>
        </div>
      ))}
      {isLoading && <ThreeDotsLoader />}
    </div>
  );
}

function ChatInput({ inputValue, setInputValue, handleSendMessage, handleKeyPress, transcript, listening, resetTranscript }) {
  return (
    <div className="p-4 bg-gray-50 border-t border-gray-200 flex items-center space-x-4">
     
      <input
        type="text"
        value={inputValue || transcript} // Show transcript if available
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={handleKeyPress}  
        className="flex-1 px-4 py-3 rounded-full border border-gray-300 shadow-md focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-150"
        placeholder="Type or say a message..."
      />
       <button
        onClick={listening ? SpeechRecognition.stopListening : SpeechRecognition.startListening}
        className={`p-2 rounded-full ${listening ? 'bg-red-500' : 'bg-green-500'} hover:bg-green-700 text-white transition duration-200`}
      >
         <FaMicrophone className="w-5 h-5" /> {/* Microphone Icon */}
      </button>
      <button
        onClick={handleSendMessage}
        className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 transition duration-200">
        Send
      </button>
    </div>
  );
}

function ThreeDotsLoader() {
  return (
    <div className="flex justify-start items-center">
      <div className="w-2.5 h-2.5 bg-gray-500 rounded-full animate-bounce"></div>
      <div className="w-2.5 h-2.5 bg-gray-500 rounded-full animate-bounce mx-1"></div>
      <div className="w-2.5 h-2.5 bg-gray-500 rounded-full animate-bounce"></div>
    </div>
  );
}
