import React, { useEffect, useState } from 'react'
import { useFetch } from '../hooks/Usefetch'
import { useRef } from 'react'
import { MdOutlineStar } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import { GiSandsOfTime } from "react-icons/gi";
import { getDailyHeroMovies } from '../api/tmdb';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap'
import SplitText from "gsap/SplitText";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

const Hero = () => {

  const [movie, setMovie] = useState(null)
  const [heroMovies, setHeroMovies] = useState(null)
  const bannerTitle = useRef(null)
  const bannerContent = useRef(null)
  const movieTitle = useRef(null)
  const movieTagline = useRef(null)
  const movieIcons = useRef(null)
  const movieOverview = useRef(null)
  const movieGenre = useRef([])
  const movieButton = useRef(null)
  const heroMoviesList = useRef([])

  const { fetchData}  = useFetch()

  const imageBaseUrl = "https://image.tmdb.org/t/p/original"
  const imagePosterUrl = "https://image.tmdb.org/t/p/w500"

  const Hr = Math.floor(movie?.runtime / 60)
  const movieHr = Hr > 1 ? `${Hr}hrs` : `${Hr}hr`
  const movieMin = movie?.runtime % 60

  const movieDuration = `${movieHr} ${movieMin}mins`


  // gsap animation

  let splitMovieOverview = SplitText.create(movieOverview.current, {
    type: 'lines'
  })

  useGSAP(() => {

    const tl = gsap.timeline()

    tl
    .from(bannerTitle.current, {
      opacity: 0,
      duration: 1,
      x: -200
    })
      .from(bannerContent.current, {
        opacity: 0,
        duration: .3,
      })
      .from(movieTitle.current, {
        opacity: 0,
        y: -20,
        duration: .5,
      })
      .from(movieTagline.current, {
        opacity: 0,
        duration: .4
      })
      .from(movieIcons.current, {
        opacity: 0,
        x: -100,
        duration: .4
      })
      .from(splitMovieOverview.lines, {
        opacity: 0,
        stagger: {
          amount: .2,
          from: 'bottom',
          ease: 'Power1.inOut'
        }
      })
      .from(movieGenre.current, {
        y: 10,
        opacity: 0,
        stagger: {
          amount: .2,
          from: 'random',
          ease: 'power2.out'
        }
      })
      .from(movieButton.current,
        {
        y: 40,
        opacity: 0,
        duration: .4,
        ease: 'power3.inOut',
      }
      )
      .from(heroMoviesList.current, {
        opacity: 0,
        x: -20,
        duration: .5,
        stagger: 0.5,
        ease: 'power2.inOut'
    })
  })
  
  useEffect(() => {
    const getTrailler = async () => {
  
      let heroMovieData = null;

      const heroMoviesArr = await getDailyHeroMovies()
      setHeroMovies(heroMoviesArr)
    
      const movieResponse = await fetchData("https://api.themoviedb.org/3/trending/movie/week")

      const movieArray = movieResponse.data?.results

      const selectedMovies = movieArray.slice(5, 8) 

    
      for (let movie of selectedMovies) {
          try {
              const movieDetails = await fetchData(`https://api.themoviedb.org/3/movie/${movie.id}?append_to_response=videos,credits`);

            const videos = movieDetails.data.videos.results;
              
              // Find the best trailer
              const trailer = videos.find(video => 
                  video.type === "Trailer" && 
                  video.site === "YouTube" &&
                  video.official === true
              ) || videos.find(video => 
                  video.type === "Trailer" && 
                  video.site === "YouTube"
              );
              
              if (trailer) {
                  // get the first movie details with trailerand store it
                  heroMovieData = movieDetails.data;
                  break; // Exit the loop since we found what we need
              }
          } catch (error) {
              console.error(`Failed to fetch details for movie ${movie.id}:`, error);
          }
      }

      setMovie(heroMovieData);

    }

    getTrailler()

  }, [])



  
  return (
    <section>
      <div className='relative w-screen min-h-[90dvh] flex items-end justify-between'>
        <div className='absolute top-0 right-0 w-[100%] h-[100%]  z-[20]'>
          <img src={`${imageBaseUrl}${movie?.backdrop_path}`} alt="background image" className='w-full h-full object-cover'/>
        </div>
        
        {/* <div className="hero_overlay absolute top-0 right-0 w-[100%] h-[100%] z-[30] opacity-80"></div> */}

        <div className="relative z-[60] px-2 py-2 lg:py-6 lg:px-6 2xl:py-10 2xl:px-10 flex items-end justify-end w-fit bg-black/80 backdrop-blur-2xl" ref={bannerTitle}>
          {
            movie && 
              <div className='z-[88]' ref={bannerContent}>
                <h1 className='font-bebas text-4xl lg:text-6xl uppercase' ref={movieTitle}>{movie.title}</h1>
                <p className='text-xs' ref={movieTagline}>{movie.tagline}</p>
                <div className='w-fit flex-center space-x-4 md:space-x-8 my-2 xl:my-4' ref={movieIcons}>
                  <div className='text-lg flex-center' >
                    <MdOutlineStar size={25} color={'var(--color-primary)'} className='mr-2' />
                    <span className='font-anton text-xl text-secondary-hover'>{(movie.vote_average).toFixed(1)}</span> / <span className='text-sm self-end mb-0.5'>10</span>
                  </div>
                  <div className='flex justify-center items-center w-fit text-sm lg:text-base'>
                    <SlCalender size={25} color={'var(--color-primary)'} className='mr-2' /> {movie?.release_date}
                  </div>
                  <div className='flex justify-center items-center w-fit text-sm lg:text-base'>
                    <GiSandsOfTime size={25} color={'var(--color-primary)'} className='mr-2'/> {movieDuration}
                  </div>
                </div>
                <p className='w-[100%] text-xs md:text-sm 2xl:text-base md:w-[450px] 2xl:w-[500px] leading-[1.5rem] text-justify line-clamp-2' ref={movieOverview}>{movie.overview}</p>
                <div className='w-fit flex-center space-x-4 my-6'>
                  {movie?.genres?.map((genre,  i) => (
                    <p key={i} className='px-2 py-1 bg-secondary-hover rounded-xl text-xs' ref={(el) => (movieGenre.current[i] = el)}>{ genre.name }</p>
                  ))}
                </div>
                <div className="btn space-x-4" ref={movieButton}>
                  <button className='px-4 py-2 text-xs bg-primary uppercase font-semibold'>Watch Trailler</button>
                  <button className='px-4 py-2 text-xs bg-primary uppercase font-semibold'>+ Add to List</button>
                </div>
              </div>
          }
        </div>

        <div className='hidden lg:block' >
          <div className='hidden z-[60] absolute bottom-0 right-0 flex-center flex-col md:gap-8 xl:gap-12 lg:mr-2 lg:mb-24 2xl:mr-8 2xl:mb-36' >
            {
              heroMovies?.map((movie, index) => (
                <div key={index} className='  flex items-end' ref={(el) => (heroMoviesList.current[index] = el)}>
                  <div className='aspect-square'>
                    <img src={`${imagePosterUrl}${movie.poster_path}`} alt="" className='2xl:w-40 2xl:h-60 lg:w-28 lg:h-40 rounded-xl'/>
                  </div>
                  <div className='lg:w-[250px] xl:w-[300px] 2xl:w-[400px] h-fit bg-black/70 backdrop-blur-2xl px-2 py-2 2xl:px-4 2xl:py-4 rounded-r-2xl shadow-xl mb-3'
                      style={{
                      boxShadow: `
                        2px 2px 5px #00b4d8,
                        0 0 0 #0077b6,
                        0 0 5px #ff6b6b,
                        0 0 0 #ee5a52
                      `
                    }}
                  >
                    <h1 className='font-bebas tracking-[2px] line-clamp-1'>{movie.title}</h1>
                    <div className='flex items-center xl:space-x-4 2xl:space-x-8 xl:my-1 2xl:my-2'>
                      <div className='text-lg flex-center'>
                        <MdOutlineStar size={25} color={'var(--color-primary)'} className='mr-2' />
                        <span className='font-anton text-xl text-secondary-hover'>{(movie.vote_average).toFixed(1)}</span> / <span className='text-sm self-end mb-0.5'>10</span>
                      </div>
                      <div className='flex justify-center items-center w-fit text-xs'>
                        <SlCalender size={20} color={'var(--color-primary)'} className='mr-2' /> <span>{movie?.release_date}</span> 
                      </div>
                    </div>
                    <p className='2xl:line-clamp-2 lg:line-clamp-1 text-xs'>{movie.overview}</p>
                    
                  </div>
                </div>
              ))
            }
          </div>
        </div>
        
      </div>
    </section>
  )
}

export default Hero