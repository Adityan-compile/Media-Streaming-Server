const { movie, show } = require("../../models");
const transcode = require("../../utils/transcode");

exports.addShow = async (req, res) => {
  const body = req.body;
  if (!body || Object.keys(body).length === 0) {
    return res.status(400).json({
      status: 400,
      message: "Bad Request",
    });
  }

  try {
    const newShow = await show.create(body);
    res.status(201).json({
      status: 201,
      message: "Show Created Successfully",
      movie: newShow.toJSON(),
    });
  } catch (e) {
    res.status(500).json({
      status: 500,
      message: "Cannot Create Show",
    });
  }
};

exports.addMovie = async (req, res) => {
  const body = req.body;
  if (!body || Object.keys(body).length < 10) {
    return res.status(400).json({
      status: 400,
      message: "Bad Request",
    });
  }

  try {
    const newMovie = await movie.create(body);
    res.status(201).json({
      status: 201,
      message: "Movie Created Successfully",
      movie: newMovie.toJSON(),
    });
  } catch (e) {
    res.status(500).json({
      status: 500,
      message: "Cannot Create Movie",
    });
  }
};

exports.uploadFile = (req, res) => {
  const body = req.body;
  const file = req.file;

  if (!body || Object.keys(body).length === 0 || !file) {
    return res.status(400).json({
      status: 400,
      message: "Bad Request",
    });
  }

  if (body.mediaType === "movie") {
    movie
      .findAndCountAll({
        where: {
          id: body.movieId,
        },
      })
      .then(({ count }) => {
        if (count < 1) {
          return res
            .status(400)
            .json({ status: 400, message: "Movie Not Found" });
        }
        transcode
          .transcodeVideo(file.originalName)
          .then(() => {
            movie
              .update(
                {
                  file: file.originalName,
                },
                {
                  where: {
                    id: body.movieId,
                  },
                }
              )
              .then((result) => {
                res.status(200).json({
                  status: 200,
                  message: "File Upload Success",
                });
              })
              .catch((err) => {
                res.status(500).json({
                  status: 500,
                  message: "Database Update Error",
                });
              });
          })
          .catch((err) => {
            res.status(500).json({
              status: 500,
              message: "Video Transcode Error",
            });
          });
      })
      .catch((err) => {
        return res.status(500).json({
          status: 500,
          message: "Database Query Error",
        });
      });
  } else if (body.mediaType === "show") {
    //Add TV Show File Upload Code
  } else {
    return res.status(400).json({
      status: 400,
      message: "Bad or Unsupported Media Type",
    });
  }
};
