import React from 'react'
import { Link } from 'react-router-dom'

interface INavBarProps {
  menuButtonToggled: () => void;
}

const NavBar = ({menuButtonToggled}: INavBarProps) => {
  return (
    <div className='flex flex-row w-full py-4 px-6 bg-white shadow-slate-200 text-xl text-slate-800 border-b-gray-200 border-b'>
      <img src="icons/icons8-hamburger-menu-50.png" className='h-[25px] hover:cursor-pointer' onClick={() => menuButtonToggled()}/>
    </div>
  )
}

export default NavBar