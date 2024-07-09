import React, { useContext } from "react";
import { signOut } from "firebase/auth";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../firebase";

export const Navbar = () => {
  const [settings, setSettings] = React.useState(false);
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="user">
        <img src={currentUser.photoURL} alt="image" />
        <span>{currentUser.displayName}</span>
      </div>
      <img
        src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXNldHRpbmdzIj48cGF0aCBkPSJNMTIuMjIgMmgtLjQ0YTIgMiAwIDAgMC0yIDJ2LjE4YTIgMiAwIDAgMS0xIDEuNzNsLS40My4yNWEyIDIgMCAwIDEtMiAwbC0uMTUtLjA4YTIgMiAwIDAgMC0yLjczLjczbC0uMjIuMzhhMiAyIDAgMCAwIC43MyAyLjczbC4xNS4xYTIgMiAwIDAgMSAxIDEuNzJ2LjUxYTIgMiAwIDAgMS0xIDEuNzRsLS4xNS4wOWEyIDIgMCAwIDAtLjczIDIuNzNsLjIyLjM4YTIgMiAwIDAgMCAyLjczLjczbC4xNS0uMDhhMiAyIDAgMCAxIDIgMGwuNDMuMjVhMiAyIDAgMCAxIDEgMS43M1YyMGEyIDIgMCAwIDAgMiAyaC40NGEyIDIgMCAwIDAgMi0ydi0uMThhMiAyIDAgMCAxIDEtMS43M2wuNDMtLjI1YTIgMiAwIDAgMSAyIDBsLjE1LjA4YTIgMiAwIDAgMCAyLjczLS43M2wuMjItLjM5YTIgMiAwIDAgMC0uNzMtMi43M2wtLjE1LS4wOGEyIDIgMCAwIDEtMS0xLjc0di0uNWEyIDIgMCAwIDEgMS0xLjc0bC4xNS0uMDlhMiAyIDAgMCAwIC43My0yLjczbC0uMjItLjM4YTIgMiAwIDAgMC0yLjczLS43M2wtLjE1LjA4YTIgMiAwIDAgMS0yIDBsLS40My0uMjVhMiAyIDAgMCAxLTEtMS43M1Y0YTIgMiAwIDAgMC0yLTJ6Ii8+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMyIvPjwvc3ZnPg=="
        alt=""
        onClick={() => setSettings(!settings)}
      />
      {settings && <Settings currentUser={currentUser} />}
      <button onClick={() => signOut(auth)} className="logout">
        Logout
      </button>
    </div>
  );
};

export const Settings = ({ currentUser }) => {
  const [err, setErr] = React.useState(false);
  const [name, setName] = React.useState(currentUser.displayName);
  const [img, setImg] = React.useState(currentUser.photoURL);

  const handleEdit = (newName) => {
    setName(newName);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(currentUser, {
        displayName: name,
        photoURL: img,
      });
    } catch (err) {
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
          onChange={(e) => handleEdit(e.target.value)}
        />
        <label htmlFor="file">
          <img src="/fileadd.svg" alt="add file" />
          <span>Change the avatar</span>
        </label>
        <button>Save</button>
        {err && <p className="error">Something went wrong</p>}
      </form>
    </div>
  );
};
