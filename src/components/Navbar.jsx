import React, { useContext } from 'react'
import { signOut } from 'firebase/auth'
import { AuthContext } from '../context/AuthContext'
import {auth } from '../firebase'

export const Navbar = () => {

  const { currentUser } = useContext(AuthContext);

  return (
    <div className='navbar'>
        <div className="logo">Ris Chat</div>
        <div className="user">
            <img src={currentUser.photoURL} alt="image" />
            <span>{currentUser.displayName}</span>
            <button onClick={() => signOut(auth)}>Logout</button>
        </div>
    </div>
  )
}
