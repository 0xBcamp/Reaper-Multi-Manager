import React from 'react'

interface INavBarProps {
  menuButtonToggled: () => void;
}

const NavBar: React.FC<INavBarProps> = ({ menuButtonToggled }) => {
  return (
    <div className='flex flex-row w-full py-4 px-6 bg-white shadow-slate-200 text-xl text-slate-800 border-b-gray-200 border-b'>
      <button onClick={menuButtonToggled} aria-label="Toggle Menu">
        <img src="icons/icons8-hamburger-menu-50.png" alt="Menu Icon" className='h-[25px] hover:cursor-pointer' />
      </button>
    </div>
  )
}

export default NavBar