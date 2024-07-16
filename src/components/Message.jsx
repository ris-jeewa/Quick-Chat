import React, { useContext, useEffect, useRef } from "react";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";

export const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behaviour: " smooth" });
  }, [message]);

  const formatDate = (timestamp) => {
    const currentDate = new Date();
    const messageDate = new Date(
      timestamp.seconds * 1000 - timestamp.nanoseconds / 1000000
    );

    const diffTime = currentDate - messageDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays >= 2) {
      return messageDate.toDateString();
    } else if (diffDays === 1) {
      return "Yesterday";
    } else {
      const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
      if (diffHours > 0) {
        return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;
      }
      const diffMinutes = Math.floor(diffTime / (1000 * 60));
      if (diffMinutes > 0) {
        return `${diffMinutes} minute${diffMinutes !== 1 ? "s" : ""} ago`;
      } else {
        return `Just now`;
      }
    }
  };
  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && "owner"}`}
    >
      <div className="messageInfo">
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
        <span>{formatDate(message.date)}</span>
      </div>
      <div className="messageContent">
        {message.img && <img src={message.img} alt="" />}
        <p>{message.text}</p>
      </div>
    </div>
  );
};
