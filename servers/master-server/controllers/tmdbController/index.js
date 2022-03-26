const axios = require("../../config/axios");
const cache = require("../../config/cache");
const ResponseBuilder = require("../../utils/response");

exports.searchMovies = async (req, res) => {
  const query = req.query.q;

  if (!query)
    return res.status(400).json(new ResponseBuilder().setStatus(400).setMessage("Bad Request").build());

  if (query.length === 0)
    return res.status(422).json(new ResponseBuilder().setStatus(422).setMessage("Query Length Insufficient").build());


  const cachedResponse = await cache.checkCache(`movies-${query}`);
  if (!cachedResponse) {
    try {
      const {data} = await axios.get(`/search/movie?query=${encodeURIComponent(query)}`);
      cache.cacheResponse(`movies-${query}`, data.results);
      res.status(200).json(new ResponseBuilder().setStatus(200).setBody({
        results: data.results
      }).build()); 
    } catch (e) {
      console.error(e)
      res.status(503).json(new ResponseBuilder().setStatus(503).setMessage("TMDB Unavailable").build());
    }
  }else{
     res.status(200).json(new ResponseBuilder().setStatus(200).setBody({
      results: cachedResponse
  }).build()); 
  }
};

exports.searchShows = async (req, res) => {
    const query = req.query.q;
  
    if (!query)
      return res.status(400).json(new ResponseBuilder().setStatus(400).setMessage("Bad Request").build());
  
    if (query.length === 0)
      return res.status(422).json(new ResponseBuilder().setStatus(422).setMessage("Query Length Insufficient").build())
  
    const cachedResponse = await cache.checkCache(`shows-${query}`);
  
    if (!cachedResponse) {
      try {
        const {data} = await axios.get(`/search/tv?query=${query}`);
        cache.cacheResponse(`shows-${query}`, data.results);
        res.status(200).json(new ResponseBuilder().setStatus(200).setBody({
          results: data.results
        }).build()); 
      } catch (e) {
        res.status(503).json(new ResponseBuilder().setStatus(503).setMessage("TMDB Unavailable").build());
      }
    }else{
       res.status(200).json(new ResponseBuilder().setStatus(200).setBody({
        results: cachedResponse
    }).build()); 
    }
  };