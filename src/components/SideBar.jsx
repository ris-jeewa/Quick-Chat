import React from "react";
import { Navbar } from "./Navbar";
import { Search } from "./Search";
import { Chats } from "./Chats";

export const SideBar = () => {
  return (
    <div className="sidebar">
      <Navbar />
      <Search />
      <Chats />
    </div>
  );
};
