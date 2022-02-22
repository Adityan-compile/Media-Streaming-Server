import React from 'react'
import useMovies from "../../hooks/movies";

function MoviesScreen() {

  const { fetchMovies, movies } = useMovies(()=>{});

  return (
    <div>MoviesScreen</div>
  )
}

export default MoviesScreen;