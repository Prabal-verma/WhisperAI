"use client"
import 'regenerator-runtime/runtime';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { ChatBubbleOvalLeftIcon, XMarkIcon, PaperAirplaneIcon, MicrophoneIcon, EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Markdown from 'react-markdown';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [history, setHistory] = useState([]);
  const [isMounted, setIsMounted] = useState(false);

  const chatBodyRef = useRef(null);
  const dropdownRef = useRef(null); // Add ref for the dropdown

  // Speech recognition
  const { transcript, listening, resetTranscript, stopListening } = useSpeechRecognition();

  useEffect(() => {
    setIsMounted(true); // Set mounted state
  }, []);

  // Load chat history from localStorage on component mount
  useEffect(() => {
    if (isMounted) {
      const storedHistory = JSON.parse(localStorage.getItem('chatHistory'));
      if (storedHistory) {
        setHistory(storedHistory);
      }
    }
  }, [isMounted]);

  // Save chat history to local storage whenever messages change
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('chatHistory', JSON.stringify(history));
    }
  }, [history, isMounted]);

  // Stop listening and trigger message sending when voice input is captured
  useEffect(() => {
    if (!listening && transcript) {
      setInputMessage(transcript); 
      handleSendMessage();
    }
  }, [transcript, listening]);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const addResponseMessage = (message, sender = 'bot') => {
    const newMessage = { text: message, sender };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setHistory((prevHistory) => [...prevHistory, newMessage]); // Add to chat history
  };

  const addTypingMessage = () => {
    setMessages((prevMessages) => [...prevMessages, { text: 'Typing...', sender: 'bot', isTyping: true }]);
  };

  const removeTypingMessage = () => {
    setMessages((prevMessages) => prevMessages.filter((message) => !message.isTyping));
  };

  const handleNewUserMessage = async (newMessage) => {
    try {
      setIsTyping(true);
      addTypingMessage();

      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyDpD_Nbn101S4lRcggObsGv7zmqFjCvAwg`,
        method: 'POST',
        data: {
          contents: [
            {
              parts: [{ text: newMessage }],
            },
          ],
        },
      });

      const generatedContent = response.data.candidates[0].content.parts[0].text;

      removeTypingMessage();
      addResponseMessage(generatedContent, 'bot');
    } catch (error) {
      console.error('Error fetching chatbot response:', error);
      removeTypingMessage();
      addResponseMessage('Oops! Something went wrong.', 'bot');
    } finally {
      setIsTyping(false);
    }
  };

  const handleSendMessage = async () => {
    if (inputMessage.trim() !== '') {
      addResponseMessage(inputMessage, 'user');
      await handleNewUserMessage(inputMessage);
      setInputMessage('');
      resetTranscript();
    }
  };

  // Auto-scroll to the bottom whenever a new message is added
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  if (!SpeechRecognition.browserSupportsSpeechRecognition() || !isMounted) {
    return <span>Browser does not support speech recognition.</span>;
  }

  const handleNewChat = () => {
    setMessages([]);
  };

  const handleViewHistory = () => {
    setMessages(history); // Load chat history
  };

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem('chatHistory'); // Clear local storage
    setMessages([]);
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {!isOpen ? (
        <button
          onClick={toggleChat}
          className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full p-3 shadow-lg hover:bg-gradient-to-r hover:from-indigo-500 hover:to-blue-600 transition ease-in-out duration-300"
        >
          <ChatBubbleOvalLeftIcon className="h-6 w-6" />
        </button>
      ) : (
        <div className="fixed bottom-5 right-5 w-96 bg-white rounded-lg shadow-xl border border-gray-300 transform transition-all ease-in-out duration-300">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-3 flex justify-between items-center rounded-t-lg">
            <span className="text-lg">Chat with us!</span>
            <div className="relative" ref={dropdownRef}>
              <button onClick={toggleDropdown}>
                <EllipsisVerticalIcon className="h-5 w-5 text-white absolute right-[-95px] top-[0] " />
              </button>
              {showDropdown && (
                <div className="absolute right-[-120px] top-6 mt-2 w-48 bg-white text-black border border-gray-300 rounded-md shadow-lg z-10">
                  <ul>
                    <li onClick={handleNewChat} className="p-2 cursor-pointer hover:bg-gray-100">New Chat</li>
                    <li onClick={handleViewHistory} className="p-2 cursor-pointer hover:bg-gray-100">View History</li>
                    <li onClick={handleClearHistory} className="p-2 cursor-pointer hover:bg-gray-100">Clear History</li>
                  </ul>
                </div>
              )}
            </div>
            <button onClick={toggleChat}>
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>

          {/* Chat Body */}
          <div
            ref={chatBodyRef}
            className="p-3 h-80 overflow-y-auto flex flex-col space-y-2 text-black"
          >
            {messages.length > 0 ? (
              messages.map((message, index) => (
                <div
                  key={index}
                  className={`p-2 rounded-md ${
                    message.sender === 'user' ? 'bg-blue-100 self-end' : 'bg-gray-100 self-start'
                  }`}
                >
                  <Markdown>{message.text}</Markdown>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center">Start a conversation...</p>
            )}
          </div>

          {/* Chat Input */}
          <div className="p-3 border-t border-gray-300 flex items-center space-x-2 text-black">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type your message..."
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()} 
            />
            <button
              onClick={() => SpeechRecognition.startListening({ continuous: false })}
              className={`p-2 ${listening ? 'bg-green-500' : 'bg-gray-300'} text-white rounded-full`}
            >
              <MicrophoneIcon className="h-5 w-5" />
            </button>
            <button
              onClick={handleSendMessage}
              className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 transition ease-in-out duration-300"
            >
              <PaperAirplaneIcon className="h-5 w-5 transform rotate-45" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
