import React from 'react'
import { IoSearch } from "react-icons/io5";

export const Search = () => {
  return (
    <div className='hidden'>
      <div className=' flex-center space-x-4 '>
        <input
          type="text"
          placeholder="Search for movies..."
          className='outline-0 bg-transparent text-sm placeholder:text-gray-500 py-2.5 px-2 border-b-2 border-primary'
        />
        <div>
          <IoSearch size={25}/>
        </div>
      </div>
    </div>
  )
}
