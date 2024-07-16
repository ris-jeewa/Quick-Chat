import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import {
  updateDoc,
  doc,
  arrayUnion,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import Picker from "emoji-picker-react";

const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const [showEmoji, setShowEmoji] = useState(false);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          // setErr(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      text && await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
      
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: { text },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: { text },
      [data.chatId + ".date"]: serverTimestamp(),
    });
    setText("");
    setImg(null);
  };

  const onEmojiClick = (emojiObject) => {
    setText((prevInput) => prevInput + emojiObject.emoji);
    setShowEmoji(false);
  };

  return (
    <div className="input">
      <div className="left">
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label htmlFor="file">
          <img
            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXBsdXMiPjxwYXRoIGQ9Ik01IDEyaDE0Ii8+PHBhdGggZD0iTTEyIDV2MTQiLz48L3N2Zz4="
            alt=""
          />
        </label>
        <input
          type="text"
          placeholder="Type something..."
          style={{ width: "100%" }}
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
      </div>
      <div className="send">
        <img
        src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMzZTNjM2MiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1zbWlsZSI+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTAiLz48cGF0aCBkPSJNOCAxNHMxLjUgMiA0IDIgNC0yIDQtMiIvPjxsaW5lIHgxPSI5IiB4Mj0iOS4wMSIgeTE9IjkiIHkyPSI5Ii8+PGxpbmUgeDE9IjE1IiB4Mj0iMTUuMDEiIHkxPSI5IiB5Mj0iOSIvPjwvc3ZnPg=="
          alt=""
          onClick={() => setShowEmoji((val) => !val)}
        />
        {showEmoji && (
          <div className="emoji">
            <Picker
              // height={300}
              // width={300}
              skinTonesDisabled="true"
              searchDisabled="false"
              reactionsDefaultOpen="false"
              allowExpandReactions="false"
              lazyLoadEmojis="false"
              autoFocusSearch="false"
              pickerStyle={{width: "100%"}}
              preload="false"
              onEmojiClick={onEmojiClick}
            />
          </div>
        )}
        <button onClick={handleSend} className="sendbtn">
          <img
            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM3MDA4NzciIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1zZW5kIj48cGF0aCBkPSJtMjIgMi03IDIwLTQtOS05LTRaIi8+PHBhdGggZD0iTTIyIDIgMTEgMTMiLz48L3N2Zz4="
            alt=""
          />
        </button>
      </div>
    </div>
  );
};

export default Input;
