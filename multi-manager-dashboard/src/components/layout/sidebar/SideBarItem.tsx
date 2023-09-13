import React from 'react'
import { SideBarRoute } from '../../../utils/routes'
import { Link } from 'react-router-dom'

type Props = {
    route: SideBarRoute
}

function SideBarItem({ route }: Props) {
    return (
        <Link to={route.path}>
            <div className='flex flex-row px-5 py-3 font-sans hover:bg-blue-50 text-md space-x-3 items-center'>
                <img src={`icons/${route.image}`} alt={`side menu - ${route.name}`} className='h-[15px] hover:cursor-pointer' />
                <div>{route.name}</div>
            </div>
        </Link>

    )
}

export default SideBarItem