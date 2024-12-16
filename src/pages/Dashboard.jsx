import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { IoMenuSharp } from "react-icons/io5";

import Sidebar from '../components/core/Dashboard/Sidebar'


const Dashboard = () => {

    const {loading : authLoading} = useSelector((state) => state.auth)
    const {loading : profileLoading} = useSelector((state) => state.profile)

    const sidebarRef = useRef(null);

    // Toggle Sidebar Visibility
    const toggleSidebar = () => {
        if (sidebarRef.current) {
        sidebarRef.current.classList.toggle("hidden");
        }
    };

    if(profileLoading || authLoading) {
        return (
            <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
                <div className="spinner"></div>
            </div>
            )
    }

  return (
    <div className='realtive flex'>

        {/* //MENU BAR // */}
        <button
            className='absolute top-16 z-50 p-2 text-white bg-gray-700 rounded-md lg:hidden text-xl'
            onClick={toggleSidebar}
         >
            <IoMenuSharp fontSize={25}/>
        </button>
        
        {/* Sidebar */}
        <div
            ref={sidebarRef}
            className="hidden lg:block min-w-[220px] border-r-[1px] border-r-richblack-700 bg-richblack-800"
         >
            <Sidebar />
        </div>

        {/* main CONTENT  */}

        <div className='min-h-[calc(100vh-3.5rem)] flex-1 overflow-auto scroll-bar'>
            <div className='mx-auto w-11/12 max-w-[1000px] py-10'>
                <Outlet/>
            </div>

        </div>

        
    </div>
  )
}

export default Dashboard