import { Link } from 'react-router-dom'

function SideBar() {
  return (
    <div className='bg-white h-screen border-r-gray-200 border-r'>
      <div className='p-3 flex justify-center text-xl font-semibold'>
        <Link to="/">
          <div className='flex flex-row space-x-2 items-center hover:text-gray-500 transition-colors duration-200'>
            <img src="icons/strategy-development.png" alt='project logo' className='h-[35px] hover:cursor-pointer' />
            <div>Reaper Dashboard</div>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default SideBar