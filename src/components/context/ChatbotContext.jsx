// context/ChatbotContext.js
import { createContext, useContext, useState } from 'react';

const ChatbotContext = createContext();

export const ChatbotProvider = ({ children }) => {
  const [isChatbotVisible, setChatbotVisible] = useState(true);

  return (
    <ChatbotContext.Provider value={{ isChatbotVisible, setChatbotVisible }}>
      {children}
    </ChatbotContext.Provider>
  );
};

export const useChatbot = () => {
  return useContext(ChatbotContext);
};
