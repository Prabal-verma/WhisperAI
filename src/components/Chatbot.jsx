"use client";
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
    const initialX = 20; // Distance from the right
    const initialY = 20; // Distance from the bottom
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
    const clientX = e.clientX || e.touches[0].clientX;
    const clientY = e.clientY || e.touches[0].clientY;

    offset.current = {
      x: clientX - widgetRef.current.getBoundingClientRect().left,
      y: clientY - widgetRef.current.getBoundingClientRect().top,
    };
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchmove', handleMouseMove);
    document.addEventListener('touchend', handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (isDragging.current) {
      const clientX = e.clientX || e.touches[0].clientX;
      const clientY = e.clientY || e.touches[0].clientY;
      
      const newX = window.innerWidth - (clientX - offset.current.x + widgetRef.current.offsetWidth);
      const newY = window.innerHeight - (clientY - offset.current.y + widgetRef.current.offsetHeight);

      setPosition({
        x: Math.max(0, Math.min(newX, window.innerWidth - widgetRef.current.offsetWidth)),
        y: Math.max(0, Math.min(newY, window.innerHeight - widgetRef.current.offsetHeight)),
      });

      dragStarted.current = true;
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
    document.removeEventListener('touchmove', handleMouseMove);
    document.removeEventListener('touchend', handleMouseUp);
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
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_KEY}`,
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
      style={{ bottom: `${position.y}px`, right: `${position.x}px` }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleMouseDown}
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
            <button
              onClick={toggleChat}
              className="text-white bg-transparent border-none focus:outline-none"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>

          <div
            className="p-4 space-y-4 h-72 overflow-y-auto scrollbar-hide"
            ref={chatBodyRef}
          >
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`${
                    message.sender === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-800'
                  } p-2 rounded-lg shadow-md`}
                >
                  <Markdown>{message.text}</Markdown>
                </div>
              </div>
            ))}
            
          </div>

          <div className="p-4 flex items-center">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              className="border rounded-lg p-2 flex-grow mr-2"
              placeholder="Type a message..."
            />
            <button
              onClick={handleSendMessage}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full p-3 shadow-lg"
            >
              <PaperAirplaneIcon className="h-5 w-5 transform rotate-45" />
            </button>
            <button
              onClick={SpeechRecognition.startListening}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full p-3 shadow-lg ml-2"
            >
              <MicrophoneIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
