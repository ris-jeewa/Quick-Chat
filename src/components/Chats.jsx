import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { ChatContext } from "../context/ChatContext";

export const Chats = () => {
  const [chats, setChats] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = async (user) => {
    const details = await getDoc(doc(db, "users", user.uid));
    dispatch({ type: "CHANGE_USER", payload: details.data() });
  };

  return (
    <div className="chats">
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat) => (
          <div
            className="userChat"
            key={chat[0]}
            onClick={() => handleSelect(chat[1].userInfo)}
          >
            <ChatComponent userId={chat[1].userInfo.uid} lastMessage={chat[1].lastMessage?.text}/>
          </div>
        ))}
    </div>
  );
};

const ChatComponent = ({ userId,lastMessage }) => {
  const [userData,setUserData] = useState({});

  useEffect(() => {
    const getNewName = async (userId) => {
      getDoc(doc(db, "users", userId)).then((data)=>{
        setUserData(data.data());
      })
    };
    getNewName(userId);
    
  }, []);


  return (
    <>
      <img src={userData?.photoURL} alt="img" />
      <div className="userChatInfo">
        <span>{userData?.displayName}</span>
        <p>{lastMessage}</p>
      </div>
    </>
  );
};
