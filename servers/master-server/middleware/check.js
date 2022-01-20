
const { movies } = require("../models");

exports.checkMovie = (req, res, next) => {
  const params = req.query;

  if (!params || Object.keys(params).length === 0) {
    return res.status(400).json({
      status: 400,
      message: "Bad Request",
    });
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
          .json({ status: 400, message: "Movie Not Found" });
      }
      next();
    }).catch(err=>{
        return res.status(500).json({
            status: 200,
            message: "Server Error"
        })
    });
};
