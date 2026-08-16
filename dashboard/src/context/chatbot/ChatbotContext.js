import { createContext, useContext } from "react";

const ChatbotContext = createContext(null);

export const useChatBot = () => {
  const context = useContext(ChatbotContext);

  if (!context) {
    throw new Error("useChatBot must be used inside ChatbotProvider");
  }

  return context;
};

export default ChatbotContext;
