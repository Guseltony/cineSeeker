import axios from 'axios'
import React, {  useState } from 'react'

export const useFetch = () => {

  // const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)


    const fetchData = async (url) => {
      try {
        setLoading(true)
        const fetchMovie = await axios.get(url, {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
          }
        })
        return fetchMovie
        // if (fetchMovie.data) {
        //   setData(fetchMovie.data)
        // }
      } catch (error) {
        console.log("Error fetching data: ", error)
        setError(error)
      } finally {
        setLoading(false)
      }
    }


  
  return { loading, error, fetchData}
}
