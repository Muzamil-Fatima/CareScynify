import { api } from "./axios";

// Send patient message to chatbot
export const sendChatbotMessage = async (message) => {
  const res = await api.post("/api/patient/chatbot/message", {
    message,
  });

  return res.data;
};