import React from "react";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";

const ChatBotButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-full shadow-lg z-50"
    >
      <SmartToyOutlinedIcon />
    </button>
  );
};

export default ChatBotButton;