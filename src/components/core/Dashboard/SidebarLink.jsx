//it represents only 1 tab link of sidebar  

import React from 'react'

//it imports all icons at a time and all icons have vsc prefix 
import * as Icons from "react-icons/vsc"
// import { useDispatch } from 'react-redux';
import { matchPath, NavLink, useLocation } from 'react-router-dom';

const SidebarLink = ({tab, iconName}) => {
    
    const location = useLocation() //from app route path    

    const Icon = Icons[iconName]; //** new*/

    //yahan par useLocation() help karega ki konsa tab open hoga ?
    // const dispatch = useDispatch()

    //ye functionality tab use hota hai jaha par hame kissi ek tab ko active dikhana hai dusre ko nehi according to 
    const matchRoute = (route) => {
        return matchPath({path:route}, location.pathname)
    }

  

  return (

    //whole my profile suggest to NavLink --> same in same of enrolled course and like that for all tabs 
    <NavLink 
        to={tab?.path}
        //when you want to hightlight something do this type of styling
        className={`relative px-8 py-3 text-sm font-medium 
            ${matchRoute(tab.path) 
                ? "bg-yellow-800 text-yellow-50" 
                : "bg-opacity-0 text-richblack-300"} transition-all duration-200`}
    >

        <span className={`absolute left-0 top-0 h-full w-[0.2rem] bg-yellow-50 ${matchRoute(tab.path) ? "opacity-100" : "opacity-0"} `}>
        </span>

        <div className='flex items-center gap-x-2'>
            <Icon className="text-lg"/>
            <span>{tab.name}</span>
        </div>

        

    </NavLink>
  )
}

export default SidebarLink

