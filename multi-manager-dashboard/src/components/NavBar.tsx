import React from 'react'
import { Link } from 'react-router-dom'

function NavBar() {
  return (
    <div className='flex flex-row w-full py-2 px-6 bg-white shadow-slate-200 shadow text-xl text-slate-800 justify-between align-middle'>
        <div><Link to="/">Reaper Multi Manager</Link></div>
    </div>
  )
}

export default NavBar