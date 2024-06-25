import React from 'react'
import { SideBar } from '../components/SideBar'
import { Chat } from '../components/Chat'

export const Home = () => {
  return (
    <div className='home'>
        <div className="container">
            <SideBar />
            <Chat />
        </div>
    </div>
  )
}
