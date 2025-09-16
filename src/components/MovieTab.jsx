import React, { useEffect, useRef, useState } from 'react'
import { useFetch } from '../hooks/Usefetch'
import { MovieCard } from './MovieCard'


const MovieTab = () => {
  const movieGenreArray = ['Trending', 'Latest', 'TopRated', 'Adult', 'Popular', 'Action', 'Romance', 'Animation']

  const {fetchData} = useFetch()

   const scrollRef = useRef(null);

  const [activeTab, setActiveTab] = useState('Trending')
  const [tabMovies, setTabMovies] = useState([])
  const [trending, setTrending] = useState([])
  const [latest, setLatest] = useState([])
  const [topRated, setTopRated] = useState([])
  const [romance, setRomance] = useState([])
  const [popular, setPopular] = useState([])
  const [action, setAction] = useState([])
  const [animation, setAnimation] = useState([])
  const [adult, setAdult] = useState([])

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

    // const [clickedMovie, setClickedMovie] = useState()
  const [isSelected, setIsSelected] = useState(false)
  const [isSelectedId, setIsSelectedId] = useState()

  const handleClickTap = (tab) => {
    setActiveTab(tab)

    switch (tab) {
      case "Trending":
        setTabMovies(trending)
        break;
      
      case "Latest":
        setTabMovies(latest)
        break;
      case "TopRated":
        setTabMovies(topRated)
        break;
      case "Adult":
        setTabMovies(adult)
        break;
      case "Popular":
        setTabMovies(popular)
        break;
      case "Action":
        setTabMovies(action)
        break;
      case "Romance":
        setTabMovies(romance)
        break;
      case "Animation":
        setTabMovies(animation)
        break;
    
      default:
        break;
    }
  }

  useEffect(() => {
    const fetchMoviesForTab = async () => {
      // trending movies
      const trendingMovies = await fetchData('https://api.themoviedb.org/3/trending/movie/day?include_video=true')
      
      const trendingMovieArray = trendingMovies?.data.results.slice(0, 15)
      if (trendingMovieArray) {
        try {
          setTrending(trendingMovieArray)
          setTabMovies(trendingMovieArray)
        } catch (error) {
          console.log(error)
        }
      }

      // latest movies

      const latestMovies = await fetchData('https://api.themoviedb.org/3/movie/popular?include_video=true')

      const latestMovieArray = latestMovies?.data.results.slice(0, 15)
      if (latestMovieArray) {
        try {

          setLatest(latestMovieArray)

        } catch (error) {
          console.log(error)
        }
      }
      
      
      // top rated
            const ratedMovies = await fetchData('https://api.themoviedb.org/3/movie/top_rated')
      
            const ratedMovieArray = ratedMovies?.data.results.slice(0, 15)
            if (ratedMovieArray) {
              try {
      
                setTopRated(ratedMovieArray)
                console.log(ratedMovieArray)
      
              } catch (error) {
                console.log(error)
              }
      }
      
      // popular
      
      const popularMovies = await fetchData('https://api.themoviedb.org/3/movie/popular')

      const popularMovieArray = popularMovies?.data.results.slice(0, 15)
      if (popularMovieArray) {
        try {

          setPopular(popularMovieArray)

        } catch (error) {
          console.log(error)
        }
}

      // action
      const actionMovies = await fetchData('https://api.themoviedb.org/3/discover/tv?with_genres=10759')

      const actionMovieArray = actionMovies?.data.results.slice(0, 15)
      if (actionMovieArray) {
        try {

          setAction(actionMovieArray)

        } catch (error) {
          console.log(error)
        }
      }
      
      // romance
      const romanceMovies = await fetchData('https://api.themoviedb.org/3/discover/movie?with_genres=10749')

      const romanceMovieArray = romanceMovies?.data.results.slice(0, 15)
      if (romanceMovieArray) {
        try {


          setRomance(romanceMovieArray)

        } catch (error) {
          console.log(error)
        }
      }
      
      // animation
      const animationMovies = await fetchData('https://api.themoviedb.org/3/discover/movie?with_genres=16')

      const animationMovieArray = animationMovies?.data.results.slice(0, 15)
      if (animationMovieArray) {
        try {
  

          setAnimation(animationMovieArray)

        } catch (error) {
          console.log(error)
        }
      }

      // adult
      const adultMovies = await fetchData('https://api.themoviedb.org/3/search/movie?api_key=f10e67741fb4ed524fe27baab364b3d9&query=cougar&page=1&include_adult=true')

      const adultMovieArray = adultMovies?.data.results.slice(0, 15)
      
      if (adultMovieArray) {
        try {
          setAdult(adultMovieArray)
          
        } catch (error) {
          console.log(error)
        }
      }

    }

    // console.log("adult:", adult)
    // console.log("trending:", trending)
    
    fetchMoviesForTab()
  }, [])

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onWheel = (e) => {
      if (e.deltaY === 0) return;
      e.preventDefault(); // stop normal vertical scroll
      el.scrollTo({
        left: el.scrollLeft + e.deltaY,
        behavior: "smooth",
      });
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  const handleMovieDetails = async(id) => {
    // const fetchMovieDetails = await fetchData(`https://api.themoviedb.org/3/movie/${id}?append_to_response=videos,credits`)
    // setIsSelected(false)
    setIsSelected(tabMovies.map((m) => m.id !== id ? false : true))
    setIsSelectedId(id)
      // setClickedMovie(fetchMovieDetails?.data)
    

    // console.log(fetchMovieDetails)
  }



  // When user presses mouse down
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  // When user releases mouse
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // When user moves mouse
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault(); // prevent text selection
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // drag speed factor
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  
   console.log(activeTab)
  return (

    <section className=' px-[4px] mt-[4rem] lg:px-[5rem] xl:px-[12rem] lg:my-[5rem] flex flex-col select-none'>
      <div>
        {/* text */}
        <div className='relative mb-6 h-[80px] inline-flex items-center justify-center'>
          <div className='w-1 h-[100%] bg-red-900 absolute left-0 top-0 rounded-full'></div>
          <div className='ml-2'>
            <h1 className='font-anton text-xl text-primary'> <span className='text-secondary-hover'>CineSeeker</span> Picks</h1>
            <p className='text-sm'>Switch tabs, switch vibes and get the ultimate movie experience.</p>
          </div>
        </div>

        {/* tab part */}
        <div className='bg-primary/50 backdrop-blur-3xl px-4 py-1.5 rounded-full lg:w-fit max-w-full lg:ml-8'>
          <div className='flex items-center gap-4 lg:gap-8 overflow-x-auto scrollbar scroll-smooth'>
            {
              movieGenreArray.map((g, index) => 
                <div key={index} onClick={() => handleClickTap(g)} className={`${activeTab === g ? 'cursor-not-allowed bg-secondary-hover py-1 px-2.5 rounded-full pointer-events-none' : 'cursor-pointer select-none w-fit'}`}>
                  <p className='w-fit'>{ g }</p>
                </div>
              )
            }
          </div>
        </div>

        {/* movies part */}
        <div className='side_shadow relative'>
          <div className=' flex items-center gap-4 lg:gap-10 overflow-x-auto mt-8 lg:mt-10 h-[350px] pl-4 lg:pl-8 lg:pr-12 scrollbar mb-10' ref={scrollRef} onMouseDown={handleMouseDown} onMouseLeave={handleMouseUp} onMouseUp={handleMouseUp} onMouseMove={handleMouseMove}>
            {
              tabMovies.map((m, index) => (
                <MovieCard {...m} onclick={handleMovieDetails} isSelected={isSelected} setIsSelected={setIsSelected} key={index} isSelectedId={ isSelectedId } />
              ))
            }
          </div>
        </div>
      </div>
    </section>
  )
}

export default MovieTab