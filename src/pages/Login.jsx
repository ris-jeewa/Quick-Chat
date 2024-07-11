import React from 'react'
import '../style.scss'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from '../firebase';

export const Login = () => {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErr(true);
      return;
    }

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password)
      navigate("/")
    } catch (err) {
      console.log("last",err.message)
      setErr(true);
    }finally{
      setLoading(false);
    }
  };

  return (
    <div className='formContainer'>
        <div className="formWrapper">
            <span className="logo">Ris Chat</span>
            <span className="title">Login</span>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder='Enter email' required/>
                <input type="password" placeholder='Enter Password'/>
                <button>{loading? 
                <div className="loader-circle animate-spin" />:"Login"}</button>
                {err && <p className="error">Invalid email or password. Please try again.</p>}
            </form>
            <p>You don't have an account? <Link to="/register">Register</Link> </p>
        </div>
    </div>
  )
}
