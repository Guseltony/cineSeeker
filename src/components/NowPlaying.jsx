import React, { useEffect, useState } from 'react'
import { useFetch } from '../hooks/Usefetch'
import { MdOutlineStar } from 'react-icons/md'

const NowPlaying = () => {

  const { fetchData } = useFetch()

  const imagePosterUrl = "https://image.tmdb.org/t/p/w500"

  const [playingMovie, setPlayingMovie] = useState([])
  const [trailer, setTrailer] = useState()
  const [otherPlayingMovies, setOtherPlayingMovies] = useState([])
  
  useEffect(() => {
    const fetchPlayingMovie = async () => {
      try {
        const fetchingUrl = await fetchData('https://api.themoviedb.org/3/movie/now_playing')
        const playingMovieArray = fetchingUrl?.data?.results
        const selectedMovies = playingMovieArray.slice(3, 8)
        const randomMovies = Math.floor(Math.random() * selectedMovies.length)
        const trailerMoviePlaying = selectedMovies[randomMovies]
        const fetchFullTrailer = await fetchData(`https://api.themoviedb.org/3/movie/${trailerMoviePlaying.id}/videos`)
        setPlayingMovie(trailerMoviePlaying?.data)
        const playingMovieCatalogue = selectedMovies.filter((m) => m.id !== trailerMoviePlaying.id)
        setOtherPlayingMovies(playingMovieCatalogue)
        const filterVidWithTrailer = fetchFullTrailer.data.results.filter((v) => v.type === "Trailer")
        setTrailer(filterVidWithTrailer[0])
      } catch (error) {
        console.log(error)
      }
    }

    fetchPlayingMovie()
  }, [])


  console.log(trailer)
  return (
    <section className='px-[4px] my-0 lg:px-[5rem] xl:px-[12rem] lg:my-[5rem] select-none flex flex-col'>
        <div className='relative mb-6 w-fit h-[80px] inline-flex items-center justify-center '>
          <div className='w-1 h-[100%] bg-red-900 absolute left-0 top-0 rounded-full'></div>
          <div className='ml-2'>
            <h1 className='font-anton text-xl text-primary'> <span className='text-secondary-hover'>CineSeeker</span> Playing</h1>
            <p className='text-sm'> From big screens to your screen—catch the movies making waves today.</p>
          </div>
        </div>
      <div className='flex-between w-[100%]'>
        <div className='lg:w-[60%] w-[100%] '>
          {/* iframe part */}
          <div className='relative w-[100%] h-[400px] '>
            <div className='w-full h-28 lg:h-20 bg-black absolute top-0 left-0'></div>
            <div className='w-full h-20 bg-black absolute bottom-0 left-0'></div>
            <iframe
              className="border-0 outline-0 w-[100%] h-full"
              src={`https://www.youtube.com/embed/${trailer?.key}?autoplay=1&mute=1&modestbranding=1&controls=1&rel=0&fs=0&disablekb=1&loop=1&playlist=${trailer?.key}`}
              title="Movie Trailer"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>

          </div>
        </div>

        <div className='hidden lg:block w-[30%]'>
          {/* other movies catalogue */}
          {
            otherPlayingMovies.map((m, index) => (
              <div key={index} className='relative flex flex-row w-full h-36 mb-4 bg-primary-hover'>
                <img src={`${imagePosterUrl}${m.poster_path}`} alt="" className='' />
                <div className='absolute top-1.5 right-0 z-[35]'>
                  <div className='text-lg flex-center bg-black/70 backdrop-blur-3xl pl-2.5 pr-2 py-1.5 rounded-l-[50px] '>
                    <MdOutlineStar size={20} color={'var(--color-primary)'} className='mr-2' />
                    <span className='font-anton text-lg text-secondary-hover'>{(m.vote_average).toFixed(1)}</span> / <span className='text-xs self-end mb-0.5'>10</span>
                  </div>
                </div>
                <div className='flex flex-col justify-end pb-2 px-2 bg-black/80 backdrop-blur-3xl'>
                  <h1 className='font-semibold'>{m.title}</h1>
                  <p className='text-xs my-2'>{ m.release_date}</p>
                  <p className='line-clamp-2 text-sm'>{ m.overview }</p>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </section>
  )
}

export default NowPlaying