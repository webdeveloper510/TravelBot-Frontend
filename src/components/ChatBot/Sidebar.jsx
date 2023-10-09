import axios from "axios";
import React from "react";
import { API } from "config/Api";
import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

const ChatBotSideBar = () => {
  // States Management
  const token = localStorage.getItem("Token");
  const navigate = useNavigate();
  // Function Calling

  const handleLogOut = () => {
    localStorage.removeItem("Token");
    navigate("/");
    window.location.reload();
    // toast.success("Logged out Successfully!");
  };
  return (
    <div className="sidebar">
      <div className="new-chat-bttn">
        <div className="bttn-chat">
          <a className="flex px-3 " href="#chat">
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon-sm shrink-0"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            <span className="truncate">New Chat</span>
          </a>
        </div>
      </div>
      {/* <ul>
        <li className="search-list-titles">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="icon-sm"
            viewBox="0 0 24 24"
          >
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"></path>
          </svg>
          <div className="title-chat">Hello Request</div>
        </li>
      </ul> */}
      <button className="logout" onClick={handleLogOut}>
        Log Out
      </button>
    </div>
  );
};
export default ChatBotSideBar;
