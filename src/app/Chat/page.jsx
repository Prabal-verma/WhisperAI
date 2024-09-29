"use client";
import 'regenerator-runtime/runtime';
import { useState, useEffect,useRef } from 'react';
import axios from 'axios';
import Markdown from 'react-markdown';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { FaMicrophone, FaBars, FaTimes, FaArrowLeft, FaPaperPlane } from 'react-icons/fa';
import { useSession } from 'next-auth/react';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';

const words = `How are you feeling today?
`;


export default function ChatPage() {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Toggle for mobile sidebar
  

  // Speech recognition setup
  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  // Function to send the message
  const handleSendMessage = async () => {
    const messageToSend = inputValue.trim() !== '' ? inputValue : transcript;
    if (messageToSend === '') return;


    const newMessage = { text: messageToSend, sender: 'user', time: new Date().toLocaleString() };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputValue(''); 
    resetTranscript(); 
    setIsLoading(true);

    try {
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_KEY}`,
        method: 'POST',
        data: {
          contents: [
            {
              parts: [{ text: messageToSend }],
            },
          ],
        },
      });

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

  // Handle "Enter" key press
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
    <div className="h-screen flex flex-col md:flex-row bg-gray-100">
      {/* Sidebar toggle button for mobile */}
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
        className="md:hidden bg-blue-600 text-white p-3 fixed top-4 left-4 z-50 rounded-full shadow-lg focus:outline-none"
      >
        {isSidebarOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar for chat history */}
      <Sidebar chatHistory={chatHistory} isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

      {/* Main chat area */}
      <div className="flex-1 flex flex-col">
        <ChatWindow messages={messages} isLoading={isLoading} />
        <ChatInput 
          inputValue={inputValue} 
          setInputValue={setInputValue} 
          handleSendMessage={handleSendMessage} 
          handleKeyPress={handleKeyPress} 
          transcript={transcript} 
          listening={listening} 
          resetTranscript={resetTranscript} 
        />
       
      </div>
    </div>
  );
}

function Sidebar({ chatHistory, isSidebarOpen, setIsSidebarOpen }) {
  return (
    <>
      <div className={`fixed h-screen w-[400px] bg-blue-100 dark:bg-gray-900 text-gray-700 shadow-lg dark:text-white top-0 left-0 transform  pt-[80px] ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:relative md:translate-x-0 z-40`}>
        <div className="flex flex-col h-full py-6 px-4 mb-4">
        <h2 className="text-3xl font-bold text-center ">Chat History</h2>
        <button onClick={() => window.location.href = '/dashboard'} className="flex items-center justify-center mt-2  text-gray-700 dark:text-gray-300 ">
          <FaArrowLeft className="mr-2 " /> Back to Dashboard
        </button>
          
          <div className="space-y-2 overflow-y-auto flex-1 mt-4">
            {chatHistory.length > 0 ? (
              chatHistory.map((chat, index) => (
                <div key={index} className="p-3 bg-white bg-opacity-50 text-white rounded-lg hover:bg-white hover:opacity-80 transition duration-200">
                  <p className="text-sm font-medium text-gray-900"><Markdown>{chat.text}</Markdown></p>
                  <p className="text-xs font-light text-gray-700">{chat.time}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-white opacity-80">No chat history available</p>
            )}
          </div>
        </div>
      </div>

      {isSidebarOpen && <div className="fixed inset-0 bg-black opacity-50 z-30" onClick={() => setIsSidebarOpen(false)}></div>}
    </>
  );
}

function ChatWindow({ messages, isLoading }) {
  const { data: session } = useSession();
  const chatWindowRef = useRef(null);

  // Scroll to the bottom whenever messages change
  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div 
      className="flex-1 p-6 dark:bg-gray-900 bg-blue-50  flex flex-col space-y-4 overflow-y-auto pt-[80px] pb-[80px]"
      ref={chatWindowRef}
    >
      {messages.length === 0 ? (
        <div className="flex items-center justify-center h-full font-sans lg:text-[44px] text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to bg-gray-400 text-black  font-medium text-[35px] flex-col lg:flex-row lg:pl-0 pl-6">
          <span className="text-gray-300 p-2 lg:text-[44px]  font-medium text-[45px] bg-gradient-to-r from-blue-600 via-pink-500 to-purple-400 inline-block text-transparent bg-clip-text">Hii {session?.user?.name},</span>
          How are you feeling today?
          {/* <TextGenerateEffect words={words} /> */}
        </div>
      ) : (
        messages.map((msg, index) => (
          <div key={index} className={`p-4 rounded-lg shadow-md max-w-lg ${msg.sender === 'user' ? 'bg-blue-500 opacity-85 text-white self-end' : 'bg-gray-100 opacity-75 text-black self-start'}`}>
            <p><Markdown>{msg.text}</Markdown></p>
            <p className="text-xs mt-1">{msg.time}</p>
          </div>
        ))
      )}
      {isLoading && <ThreeDotsLoader />}
    </div>
  );
}
function ChatInput({ inputValue, setInputValue, handleSendMessage, handleKeyPress, transcript, listening, resetTranscript }) {
  return (
    <div className="p-4  flex items-center space-x-4 dark:bg-gray-900 bg-blue-50  ">
      <input
        type="text"
        value={inputValue || transcript} 
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={handleKeyPress}
        className="flex-1 px-4 py-3 rounded-full border opacity-60 focus:opacity-85 border-gray-300 shadow-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
        placeholder="Type or say a message..."
      />
      <button
        onClick={listening ? SpeechRecognition.stopListening : SpeechRecognition.startListening}
        className={`p-2 rounded-full ${listening ? 'bg-red-500' : 'bg-green-500'} hover:bg-green-700 text-white`}
      >
        <FaMicrophone className="w-5 h-5" />
      </button>
      <button
        onClick={handleSendMessage}
        className="bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-700 transition flex items-center"
      >
        <FaPaperPlane className="mr-2" /> Send
      </button>
    </div>
  );
}

function ThreeDotsLoader() {
  return (
    <div className="flex justify-start items-center gap-[2px] ">
      <div className="w-2.5 h-2.5 dark:bg-white bg-gray-300 rounded-full animate-bounce"></div>
      <div className="w-2.5 h-2.5 dark:bg-white bg-gray-300 rounded-full animate-bounce200"></div>
      <div className="w-2.5 h-2.5 dark:bg-white bg-gray-300  rounded-full animate-bounce300"></div>
    </div>
  );
}
