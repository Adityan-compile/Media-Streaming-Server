const {shows, movies} = require("../../models");
const transcode = require("../../utils/transcode");
const axios = require("../../config/axios");

exports.addShow = async (req, res) => {
  const body = req.body;
  if (!body || Object.keys(body).length === 0) {
    return res.status(400).json({
      status: 400,
      message: "Bad Request",
    });
  }

  try {
    const newShow = await shows.create(body);
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
  const movieId = req.query.id;
  if (!movieId) {
    return res.status(400).json({
      status: 400,
      message: "Bad Request",
    });
  }

  try {
    const {data:movieData} = await axios.get(
      `/movie/${movieId}?append_to_response=trailers,credits`
    );

    const genres = movieData.genres.map((el) => {
      return el.name;
    });

    const crew = movieData.credits.cast.slice(0, 10).map((el) => {
      return {
        name: el.name,
        character: el.character,
      };
    });

    const trailer = movieData.trailers.youtube.filter((el) => {
      return el.type === "Trailer";
    })[0].source;

    const studio = movieData.production_companies[0].name;
    try {
      const newMovie = await movies.create({
        name: movieData.title,
        description: movieData.overview,
        lang: movieData.original_language.toUpperCase(),
        tagline: movieData.tagline,
        poster: movieData.poster_path,
        rating: movieData.vote_average,
        createdAt: movieData.release_date,
        adult: movieData.adult,
        genres: genres,
        crew: crew,
        trailer: trailer,
        studio: studio,
      });

      res.status(201).json({
        status: 201,
        message: "Movie Created Successfully",
        movie: newMovie.toJSON(),
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({
        status: 500,
        message: "Cannot Create Movie",
      });
    }
  } catch (e) {
    res.status(503).json({
      status: 503,
      message: "TMDB Unavailable",
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
