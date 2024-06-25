import React from 'react'
import '../style.scss'

export const Login = () => {
  return (
    <div className='formContainer'>
        <div className="formWrapper">
            <span className="logo">Ris Chat</span>
            <span className="title">Login</span>
            <form action="">
                <input type="text" placeholder='Enter Name'/>
                <input type="password" placeholder='Enter Password'/>
                <button>Login</button>
            </form>
            <p>You don't have an account? Login</p>
        </div>
    </div>
  )
}
