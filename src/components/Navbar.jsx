import React from 'react'

export const Navbar = () => {
  return (
    <div className='navbar'>
        <div className="logo">Ris Chat</div>
        <div className="user">
            <img src="https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=600" alt="image" />
            <p>Username</p>
            <button>Logout</button>
        </div>
    </div>
  )
}
