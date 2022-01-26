const { movies } = require("../../models");
const fs = require("fs");
const streamer = require("express-stream-video");

exports.getMovies = async (req, res) => {
  try {
    const results = await movies.findAll({});
    res.status(200).json({
      status: 200,
      movies: results,
    });
  } catch (e) {
    res.status(500).json({ status: 500, message: "Error Getting Movies" });
  }
};

exports.streamMovie = (req, res) => {
  const filename = req.query.file;

  if (!filename) {
    return res.status(400).json({
      status: 400,
      message: "Bad Request, Filename Required",
    });
  }

  const filePath = `/var/app/uploads/${filename}`;

  streamer.stream(req,res,filePath);
};
