import media from '../services/media';
import movie from '../services/movie';
import tmdb from '../services/tmdb'

const MediaProvider = {
    ...tmdb,
    ...movie,
    ... media
  };
  
  export default MediaProvider;
  