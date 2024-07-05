import React from 'react'
import '../style.scss'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from '../firebase';

export const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      signInWithEmailAndPassword(auth, email, password)
      navigate("/")
    } catch (err) {
      console.log("last",err.message)
      setErr(true);
    }
  };

  return (
    <div className='formContainer'>
        <div className="formWrapper">
            <span className="logo">Ris Chat</span>
            <span className="title">Login</span>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='Enter Name'/>
                <input type="password" placeholder='Enter Password'/>
                <button>Login</button>
                {err && <p className="error">Something went wrong</p>}
            </form>
            <p>You don't have an account? <Link to="/register">Register</Link> </p>
        </div>
    </div>
  )
}
