import React from 'react'
import { SideBar } from '../components/SideBar'
import { Chat } from '../components/Chat'
// import url('https://fonts.googleapis.com/css2?family=Ga+Maamli&display=swap');

export const Home = () => {
  return (
    <div className='home'>
      <div className="logo">Quick Chat</div>
        <div className="container">
            <SideBar />
            <Chat />
        </div>
    </div>
  )
}
