import React, { useState } from "react";

import ChatBotButton from "../Components/chatbot/ChatBotButton";
import ChatBotModal from "../Components/chatbot/ChatBotModal";

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