import React, { useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export const Search = () => {
  const [userName, setUserName] = useState("");
  const [err, setErr] = useState(false);
  const [user, setUser] = useState(null);

  const handleSearch = async () => {
    const q = query(collection(db, "users"), where("displayName", "==", userName));

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
  };
  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };
  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Search Name"
          onKeyDown={handleKey}
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>
      {err && <span>User not Found</span>}
      {user && (
        <div className="userChat">
          <img src={user.photoURL} alt="img" />
          <div className="userChatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};
