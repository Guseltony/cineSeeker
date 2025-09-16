// import React, { useEffect, useState } from 'react'
import { MdOutlineStar } from 'react-icons/md'
import { TbListDetails } from "react-icons/tb";
import { IoCloseCircle } from "react-icons/io5";
import { HiMiniPlayCircle } from "react-icons/hi2";
// import { useFetch } from '../hooks/Usefetch';

export const MovieCard = ({poster_path, title,overview, vote_average, release_date, id, onclick, isSelected, setIsSelected, isSelectedId}) => {

  const imagePosterUrl = "https://image.tmdb.org/t/p/w500"

  // const { fetchData } = useFetch()

  // console.log(clickedMovie)

  const styles = {
    backgroundImage: `url(${imagePosterUrl}${poster_path})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center top'
  }
  

  // console.log(clickedMovie)

  return (
    <div style={styles} className='relative w-[200px] h-[300px] flex-shrink-0 group select-none cursor-pointer'>
      <div className='absolute top-1.5 right-0 z-[35]'>
        <div className='text-lg flex-center bg-black/70 backdrop-blur-3xl pl-2.5 pr-2 py-1.5 rounded-l-[50px] '>
          <MdOutlineStar size={20} color={'var(--color-primary)'} className='mr-2' />
          <span className='font-anton text-lg text-secondary-hover'>{(vote_average).toFixed(1)}</span> / <span className='text-xs self-end mb-0.5'>10</span>
        </div>
      </div>
      <div className='py-2 px-2 absolute bottom-0 bg-black/70 backdrop-blur-2xl w-[100%] flex-between'>
        <div>
          <h1 className='text-sm font-semibold mb-1 line-clamp-1 cursor-pointer hover:text-secondary-hover'>{title}</h1>
          <p className='text-xs'>{ release_date }</p>
        </div>
        <div className='border-1 border-secondary-hover px-0.5 py-0.5 lg:hidden'>
          <TbListDetails size={20} className='text-primary hover:text-primary-hover flex-shrink-0' onClick={() => onclick(id)}/>
        </div>
      </div>

      <div className={`-translate-y-[200%] group-hover:translate-y-0 transition-all duration-500 ease-in absolute top-0 right-0 w-[100%] h-[82%] bg-black/60 backdrop-blur-md hidden  lg:flex items-center justify-center px-2 cursor-pointer`}>
        <div className='flex-center flex-col gap-2 select-none '>
          <p className='text-xs md:text-sm line-clamp-5 select-none text-justify'>{overview}</p>
          <HiMiniPlayCircle className='text-primary-hover hover:text-primary cursor-pointer' size={35}/>
        </div>
      
      </div>

      {
        isSelected && isSelectedId === id &&
        <div className={`lg:hidden absolute top-0 right-0 w-[100%] h-[82%] bg-black/70 backdrop-blur-md flex-center text-justify px-2 cursor-pointer`}>
            <div>
              <IoCloseCircle className='text-secondary-hover hover:text-secondary absolute left-4 top-4' size={30} onClick={() => setIsSelected(false)} />
              <div className='flex-center flex-col gap-2'>
                <p className='text-xs md:text-sm line-clamp-6'>{ overview }</p>
                <HiMiniPlayCircle className='text-primary-hover hover:text-primary cursor-pointer' size={35}/>
              </div>
            </div>
      
        </div>
      }
    </div>
  )
}
