import React from "react";
import { SideBar } from "../components/SideBar";
import { Chat } from "../components/Chat";

export const Home = () => {
  return (
    <div className="home">
      <div className="logo">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/chat-ae78b.appspot.com/o/Blue_Minimalist_Chat_Application_Logo-removebg-preview.png?alt=media&token=661fec1a-98b6-48be-8d10-8555ff854815"
          alt="logo"
        />
        <span>Quick Chat</span>
      </div>
      <div className="container">
        <SideBar />
        <Chat />
      </div>
    </div>
  );
};
