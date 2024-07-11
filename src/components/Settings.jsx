import React from "react";
import { updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export const Settings = ({ currentUser, handleOpen }) => {
    const [err, setErr] = React.useState(false);
    const [name, setName] = React.useState(currentUser.displayName);
    const [img, setImg] = React.useState(currentUser.photoURL);
    const [loading, setLoading] = React.useState(false);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setErr(false);
  
      const file = e.target[1].files[0];
  
      try {
        let downloadURL = currentUser.photoURL;
  
        if (file) {
          const date = new Date().getTime();
          const storageRef = ref(storage, `${currentUser.uid + date}`);
  
          await uploadBytesResumable(storageRef, file);
          downloadURL = await getDownloadURL(storageRef);
        }
        setLoading(true);
        await updateProfile(currentUser, {
          displayName: name,
          photoURL: downloadURL,
        });
  
        const userDocRef = doc(db, "users", currentUser.uid);
        await updateDoc(userDocRef, {
          displayName: name,
          photoURL: downloadURL,
        }),
          setLoading(false);
        handleOpen(false);
  
        setImg(downloadURL);
      } catch (err) {
        console.log(err);
        setErr(true);
      }
    };
  
    return (
      <div className="settings">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file">
            <img src="/fileadd.svg" alt="add file" />
            <span>Change the avatar</span>
          </label>
          <button>
            {loading ? <div className="loader-circle animate-spin" /> : "Save"}
          </button>
          {err && <p className="error">Something went wrong</p>}
        </form>
      </div>
    );
  };
  