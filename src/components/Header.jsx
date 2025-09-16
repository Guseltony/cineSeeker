import React from 'react'
import { NavBar } from './NavBar'
import { PiFilmReelFill } from "react-icons/pi";
import { Search } from './Search';
import { MdOutlineFavorite } from "react-icons/md";
import { FaBell, FaUser } from "react-icons/fa";
import { FaTicketSimple } from "react-icons/fa6";
import { RiMenu4Fill } from "react-icons/ri";
import { NavLink } from 'react-router-dom';



const Header = () => {

  return (
    <div className='fixed top-0 left-0 h-28 w-[100dvw] bg-transparent mx-auto flex items-center justify-center py-4 z-[9999] '>
      <div className=' flex-between w-[100%] lg:w-[90%] xl:w-[80%] bg-black/70 backdrop-blur-2xl px-8 rounded-[50px] py-4'>
        {/* logo */}
        <NavLink to={'/'}>
          <div className='flex-center space-x-1 '>
            <h1 className='font-cinzel text-2xl font-extrabold text-primary'> <span className='font-bebas tracking-[0.4rem] font-bold text-base text-secondary'>cine</span>Seeker</h1>
            <PiFilmReelFill className='text-2xl text-secondary-hover'/>
          </div>
        </NavLink>

        {/* nav bar */}
        <NavBar />

        {/* search */}
        <Search />

        {/* icon */}
        <div className='flex-center space-x-4 lg:space-x-6 text-base lg:text-xl '>
          <MdOutlineFavorite className='text-secondary hover:text-primary-hover transition-all duration-300 ease-in cursor-pointer' />
          <FaBell className='text-secondary hover:text-primary-hover transition-all duration-300 ease-in cursor-pointer' />
          <FaUser className='text-secondary hover:text-primary-hover transition-all duration-300 ease-in cursor-pointer' />
          <FaTicketSimple className='text-secondary hover:text-primary-hover transition-all duration-300 ease-in cursor-pointer' />
          {/* <RiMenu4Fill /> */}
        </div>
      </div>
    </div>
  )
}

export default Header