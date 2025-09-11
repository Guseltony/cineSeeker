import React from "react";
import axios from "axios";

const fetchData = async (url) => {
  try {
    const fetchMovie = await axios.get(url, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
      },
    });
    return fetchMovie;
  } catch (error) {
    console.log("Error fetching data: ", error);
  }
};

const selectedMovies = async () => {
  const fetchMovies = await fetchData(
    "https://api.themoviedb.org/3/genre/movie/list?language=en-US"
  );

  const genreMovieArr = fetchMovies.data?.genres.map((movieId) => movieId.id);

  const randomGenreId =
    genreMovieArr[Math.floor(Math.random() * (genreMovieArr.length - 1))];

  const movieByGenre = await fetchData(
    `https://api.themoviedb.org/3/discover/movie?with_genres=${randomGenreId}&sort_by=popularity`
  );

  return movieByGenre.data.results;
};

export const getDailyHeroMovies = async () => {
  const movies = await selectedMovies();
  const today = new Date().toISOString().split("T")[0];
  const seed = today.split("-").join("");
  const index = parseInt(seed) % movies.length;

  return [movies[index], movies[(index + 1) % movies.length]];
};

// console.log("fetchMovie", fetchMovies.data.genres);

// const genreMovieArr = fetchMovies.data?.genres.map((movieId) => movieId.id);

// const randomGenreId =
//   genreMovieArr[Math.floor(Math.random() * (genreMovieArr.length - 1))];

// const movieByGenre = await fetchData(
//   `https://api.themoviedb.org/3/discover/movie?with_genres=${randomGenreId}&sort_by=popularity`
// );

// const movieGenreArr = movieByGenre.data.results;

// function getDailyMovies(movies) {
//   const today = new Date().toISOString().split("T")[0]; // e.g. "2025-09-09"
//   const seed = today.split("-").join(""); // "20250909"
//   const index = parseInt(seed) % movies.length;

//   return [movies[index], movies[(index + 1) % movies.length]];
// }

// const selectedMovies = getDailyMovies(movieGenreArr);

// export const tmdb = () => {
//   return <div>tmdb</div>;
// };
