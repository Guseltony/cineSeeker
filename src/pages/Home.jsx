import React from 'react'
import Hero from '../components/Hero'
import MovieTab from '../components/MovieTab'
import NowPlaying from '../components/NowPlaying'

const Home = () => {
  return (
    <div>
      <Hero />
      <MovieTab />
      <NowPlaying />
    </div>
  )
}

export default Home