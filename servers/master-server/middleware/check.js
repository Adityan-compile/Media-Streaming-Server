
const { movies } = require("../models");
const ResponseBuilder = require("../utils/response");

exports.checkMovie = (req, res, next) => {
  const params = req.query;

  if (!params || Object.keys(params).length === 0) {
    return res.status(400).json(new ResponseBuilder().setStatus(400).setMessage("Bad Request"));
  }

  movies
    .findAndCountAll({
      where: {
        id: params.movieId,
      },
    })
    .then(({ count }) => {
      if (count===0) {
        return res
          .status(400)
          .json(new ResponseBuilder().setStatus(400).setMessage("Movie Not Found"));
      }
      next();
    }).catch(err=>{
        return res.status(500).json(new ResponseBuilder().setStatus(500).setMessage("Server Error"))
    });
};
