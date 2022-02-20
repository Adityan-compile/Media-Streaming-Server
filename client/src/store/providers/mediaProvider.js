import media from '../services/media';
import movie from '../services/movie';
import tmdb from '../services/tmdb'
import show from "../services/show";

const MediaProvider = {
    ...tmdb,
    ...movie,
    ...media,
    ...show
  };
  
  export default MediaProvider;
  