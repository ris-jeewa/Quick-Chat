import React from 'react'
import '../style.scss'

export const Register = () => {
  return (
    <div className='formContainer'>
        <div className="formWrapper">
            <span className="logo">Ris Chat</span>
            <span className="title">Register</span>
            <form action="">
                <input type="text" placeholder='Enter Name'/>
                <input type="email" placeholder='Enter Email'/>
                <input type="password" placeholder='Enter Password'/>
                <input style={{display:"none"}} type='file' id='file'/>
                <label htmlFor="file">
                  <img src="/fileadd.svg" alt="add file" />
                  <span>Add an avatar</span>
                </label>
                <button>Sign Up</button>
            </form>
            <p>You do have an account? Login</p>
        </div>
    </div>
  )
}
