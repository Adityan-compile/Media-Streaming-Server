import movie from '../services/movie';
import tmdb from '../services/tmdb'

const MediaProvider = {
    ...tmdb,
    ...movie
  };
  
  export default MediaProvider;
  