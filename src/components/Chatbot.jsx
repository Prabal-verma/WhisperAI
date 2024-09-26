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
  
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const widgetRef = useRef(null);
  const offset = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const dragStarted = useRef(false);

  const chatBodyRef = useRef(null);
  const dropdownRef = useRef(null);

  const { transcript, listening, resetTranscript, stopListening } = useSpeechRecognition();

  useEffect(() => {
    setIsMounted(true);

    // Set initial position to bottom-right corner
    const initialX = window.innerWidth - 300; // Adjust according to widget width
    const initialY = window.innerHeight - 400; // Adjust according to widget height
    setPosition({ x: initialX, y: initialY });
  }, []);

  useEffect(() => {
    if (isMounted) {
      const storedHistory = JSON.parse(localStorage.getItem('chatHistory'));
      if (storedHistory) {
        setHistory(storedHistory);
      }
    }
  }, [isMounted]);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('chatHistory', JSON.stringify(history));
    }
  }, [history, isMounted]);

  useEffect(() => {
    if (!listening && transcript) {
      setInputMessage(transcript); 
      handleSendMessage();
    }
  }, [transcript, listening]);

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

  const handleMouseDown = (e) => {
    dragStarted.current = false; 
    isDragging.current = true;
    offset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (isDragging.current) {
      setPosition({
        x: e.clientX - offset.current.x,
        y: e.clientY - offset.current.y,
      });
      dragStarted.current = true;
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const toggleChat = () => {
    if (!dragStarted.current) {
      setIsOpen(!isOpen);
    }
  };

  const addResponseMessage = (message, sender = 'bot') => {
    const newMessage = { text: message, sender };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setHistory((prevHistory) => [...prevHistory, newMessage]); 
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
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=API_KEY`,
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
    setMessages(history); 
  };

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem('chatHistory');
    setMessages([]);
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  return (
    <div
      className="fixed z-50"
      ref={widgetRef}
      style={{ top: `${position.y}px`, left: `${position.x}px` }} 
      onMouseDown={handleMouseDown} 
    >
      {!isOpen ? (
        <button
          onClick={toggleChat}
          className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full p-3 shadow-lg hover:bg-gradient-to-r hover:from-indigo-500 hover:to-blue-600 transition ease-in-out duration-300"
        >
          <ChatBubbleOvalLeftIcon className="h-6 w-6" />
        </button>
      ) : (
        <div className="w-96 bg-white rounded-lg shadow-xl border border-gray-300">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-3 flex justify-between items-center rounded-t-lg">
            <span className="text-lg">Chat with us!</span>
            <div className="relative" ref={dropdownRef}>
              <button onClick={toggleDropdown}>
                <EllipsisVerticalIcon className="h-5 w-5 text-white absolute right-[-95px] top-[0]" />
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
          <div className="h-64 p-3 overflow-y-auto" ref={chatBodyRef}>
            {messages.length > 0 ? (
              messages.map((message, index) => (
                <div
                  key={index}
                  className={`mb-3 p-2 max-w-xs rounded-md ${
                    message.sender === 'user'
                      ? 'bg-blue-100 self-end'
                      : 'bg-gray-100 self-start'
                  }`}
                >
                  <Markdown>{message.text}</Markdown>
                </div>
              ))
            ) : (
              <div className="text-gray-400 text-center mt-10">
                <p>How are you feeling today?</p>
              </div>
            )}
          </div>

          {/* Chat Input */}
          <div className="p-3 bg-gray-50 flex space-x-3 items-center rounded-b-lg border-t border-gray-300">
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type a message..."
            />
            <button
              onClick={() => SpeechRecognition.startListening()}
              className="bg-gray-300 hover:bg-gray-400 rounded-full p-2"
            >
              <MicrophoneIcon className={`h-5 w-5 text-black ${listening ? 'text-red-500' : ''}`} />
            </button>
            <button
              onClick={handleSendMessage}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-2 rounded-full hover:bg-gradient-to-r hover:from-indigo-400 hover:to-blue-500 transition ease-in-out duration-300"
            >
              <PaperAirplaneIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
