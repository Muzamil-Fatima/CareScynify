import React, { useState } from "react";

import ChatBotButton from "../components/chatbot/ChatBotButton";
import ChatBotModal from "../components/chatbot/ChatBotModal";

const RootLayout = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {children}

      {/* GLOBAL CHATBOT (ALL PAGES) */}
      <ChatBotButton onClick={() => setOpen(true)} />

      {open && <ChatBotModal onClose={() => setOpen(false)} />}
    </>
  );
};

export default RootLayout;