import React from 'react'

export const Message = () => {
  return (
    <div className='message owner'>
      <div className="messageInfo">
        <img src="https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
        <span>Just Now</span>
      </div>
      <div className="messageContent">
        <img src="https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
        <p>Hello</p>
      </div>
    </div>
  )
}
