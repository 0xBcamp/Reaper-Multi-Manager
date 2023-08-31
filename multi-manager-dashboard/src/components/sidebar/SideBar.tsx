import { Link } from 'react-router-dom'
import { routes } from '../../utils/routes'
import SideBarItem from './SideBarItem'

function SideBar() {
  return (
    <div className='bg-white h-screen border-r-gray-200 border-r'>
      <div className='p-3 flex justify-center text-xl font-semibold mb-4'>
        <Link to="/">
          <div className='flex flex-row space-x-2 items-center hover:text-gray-500 transition-colors duration-200'>
            <img src="icons/strategy-development.png" alt='project logo' className='h-[35px] hover:cursor-pointer' />
            <div>Reaper Dashboard</div>
          </div>
        </Link>
      </div>
      <div className='flex flex-col'>
          {routes.map((route, index) => {
            return (
              <SideBarItem route={route} key={index}/>
            )
          })}
        </div>
    </div>
  )
}

export default SideBar