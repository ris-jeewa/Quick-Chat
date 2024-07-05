import React, { useState } from "react";
import "../style.scss";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth,db,storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";

export const Register = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const storageRef = ref(storage, displayName);

      const uploadTask = uploadBytesResumable(storageRef, file);
      
      uploadTask.on(
        (error) => {
          console.log("first",error.message);
          setErr(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });

            await setDoc(doc(db,"users",res.user.uid), {
              uid:res.user.uid,
              displayName,
              email,
              photoURL:downloadURL
            });

            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
            
          });
        }
      );

      
    } catch (err) {
      console.log("last",err.message)
      setErr(true);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Ris Chat</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Enter Name" />
          <input type="email" placeholder="Enter Email" />
          <input type="password" placeholder="Enter Password" />
          <input style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file">
            <img src="/fileadd.svg" alt="add file" />
            <span>Add an avatar</span>
          </label>
          <button>Sign Up</button>
          {err && <p>Something went wrong!</p>}
        </form>
        <p>You do have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
};
