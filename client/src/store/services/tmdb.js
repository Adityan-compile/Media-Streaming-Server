import axios from "./axios";

const tmdb = {
  searchMovie: (query) => {
    return new Promise((resolve, reject) => {
      axios
        .get(`/media/tmdb/movies/search?q=${query}`)
        .then(({ data }) => {
          resolve(data.results);
        })
        .catch((e) => reject(e));
    });
  },
};

export default tmdb;
