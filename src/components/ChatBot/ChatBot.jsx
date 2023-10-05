import React from "react";
import ChatBotSideBar from "./Sidebar";
import PreViewPage from "./ChatPreViewFirst";
const ChatBot = () => {
  return (
    <div className="main">
      <div className="chat">
        <div className="side-contetnt">
          <ChatBotSideBar />
        </div>
        <div className="content">
          <PreViewPage />
        </div>
      </div>
    </div>
  );
};
export default ChatBot;
