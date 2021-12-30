const axios = require("../../config/axios");
const cache = require("../../config/cache");

exports.searchMovies = async (req, res) => {
  const query = req.query.q;

  if (!query)
    return res.status(400).json({
      status: 400,
      message: "Bad Request",
    });

  if (query.length === 0)
    return res.status(422).json({
      status: 422,
      message: "Query Length Insufficient",
    });

  const cachedResponse = cache.checkCache(`movies-${query}`);

  if (!cachedResponse) {
    try {
      const results = await axios.get(`/search/movie?query=${query}`);
      cache.cacheResponse(`movies-${query}`, results);
      res.status(200).json({
        status: 200,
        results: cachedResponse
      }); 
    } catch (e) {
      res.status(503).json({
        status: 503,
        message: "TMDB Unavailable",
      });
    }
  }else{
     res.status(200).json({
         status: 200,
         results: cachedResponse
     }); 
  }
};

exports.searchShows = async (req, res) => {
    const query = req.query.q;
  
    if (!query)
      return res.status(400).json({
        status: 400,
        message: "Bad Request",
      });
  
    if (query.length === 0)
      return res.status(422).json({
        status: 422,
        message: "Query Length Insufficient",
      });
  
    const cachedResponse = cache.checkCache(`shows-${query}`);
  
    if (!cachedResponse) {
      try {
        const results = await axios.get(`/search/show?query=${query}`);
        cache.cacheResponse(`shows-${query}`, results);
        res.status(200).json({
          status: 200,
          results: cachedResponse
        }); 
      } catch (e) {
        res.status(503).json({
          status: 503,
          message: "TMDB Unavailable",
        });
      }
    }else{
       res.status(200).json({
           status: 200,
           results: cachedResponse
       }); 
    }
  };