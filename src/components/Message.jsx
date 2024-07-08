import React, { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";

export const Message = ({ message }) => {
  console.log(message, "this is a message");
  const { currentUser } = useContext(AuthContext);
 const { data } = useContext(ChatContext);
 
  return (
    <div className="message owner">
      {/* <div className="messageInfo">
        <img
        src={}
          alt=""
        />
        <span>Just Now</span>
      </div>
      <div className="messageContent">
        <img
          src="https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt=""
        />
        <p>Hello</p>
      </div> */}
    </div>
  );
};
