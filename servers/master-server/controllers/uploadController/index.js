const { shows, movies } = require("../../models");
const transcoder = require("../../utils/transcoder");
const axios = require("../../config/axios");
const ResponseBuilder = require("../../utils/response");

exports.addMovie = async (req, res) => {
  const movieId = req.query.id;
  if (!movieId) {
    return res
      .status(400)
      .json(
        new ResponseBuilder().setStatus(400).setMessage("Bad Request").build()
      );
  }

  try {
    const { data: movieData } = await axios.get(
      `/movie/${movieId}?append_to_response=trailers,credits`
    );
    let genres = [];
    if (movieData.genres.length > 0) {
      genres = movieData.genres.map((el) => {
        return el.name;
      });
    }

    let crew = [];
    if (movieData.credits.cast.length > 0) {
      crew = movieData.credits.cast.slice(0, 10).map((el) => {
        return {
          name: el.name,
          character: el.character,
        };
      });
    }

    let trailer = "";
    if (movieData.trailers.youtube.length > 0) {
      trailer = movieData.trailers.youtube.filter((el) => {
        return el.type === "Trailer";
      })[0].source;
    }

    let studio = "";
    if (movieData.production_companies.length > 0) {
      studio = movieData.production_companies[0].name;
    }

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
        runtime: movieData.runtime.toString(),
        backdrop: movieData.backdrop_path,
      });

      res.status(201).json(
        new ResponseBuilder()
          .setStatus(201)
          .setMessage("Show Created Successfully")
          .setBody({
            movie: newMovie.toJSON(),
          })
          .build()
      );
    } catch (e) {
      console.error(e);
      res
        .status(500)
        .json(
          new ResponseBuilder()
            .setStatus(500)
            .setMessage("Cannot Create Show")
            .build()
        );
    }
  } catch (e) {
    console.error(e);
    res
      .status(503)
      .json(
        new ResponseBuilder()
          .setStatus(503)
          .setMessage("TMDB Unavailable")
          .build()
      );
  }
};

exports.uploadMovieFile = async (req, res) => {
  const params = req.query;
  const file = req.file;

  if (!file) {
    return res
      .status(400)
      .json(
        new ResponseBuilder()
          .setStatus(400)
          .setMessage("Movie File Required for Upload")
          .build()
      );
  }
  let updated = {};
  try {
    updated = await movies.update(
      {
        file: file.filename,
      },
      {
        where: {
          id: params.movieId,
        },
        returning: true,
        plain: true,
      }
    );
  } catch (e) {
    return res
      .status(500)
      .json(
        new ResponseBuilder()
          .setStatus(500)
          .setMessage("Cannot Save Movie")
          .build()
      );
  }
  if (process.env.TRANSCODER_ENABLED) {
    try {
      await transcoder.transcode(file.filename);
    } catch (err) {
      return res
        .status(206)
        .json(
          new ResponseBuilder()
            .setStatus(206)
            .setMessage("Transcode Error, File Saved Successfully")
            .build()
        );
    }
  } else {
    transcoder.moveFile(file.filename);
  }

  return res.status(201).json(
    new ResponseBuilder()
      .setStatus(201)
      .setMessage("File Saved Successfully")
      .setBody({
        movie: updated[1].toJSON(),
      })
      .build()
  );
};

exports.uploadShowFile = async (req, res) => {
  const params = req.query;
  const file = req.file;

  if (!file) {
    return res
      .status(400)
      .json(
        new ResponseBuilder()
          .setStatus(400)
          .setMessage("Movie File Required for Upload")
          .build()
      );
  }
  let updated = {};
  try {
    updated = await shows.update(
      {
        file: file.filename,
      },
      {
        where: {
          id: params.movieId,
        },
        returning: true,
        plain: true,
      }
    );
  } catch (e) {
    return res
      .status(500)
      .json(
        new ResponseBuilder()
          .setStatus(500)
          .setMessage("Cannot Save Show")
          .build()
      );
  }
  if (process.env.TRANSCODER_ENABLED) {
    try {
      await transcoder.transcode(file.filename);
    } catch (err) {
      return res
        .status(206)
        .json(
          new ResponseBuilder()
            .setStatus(206)
            .setMessage("Transcode Error, File Saved Successfully")
            .build()
        );
    }
  } else {
    transcoder.moveFile(file.filename);
  }

  return res.status(201).json(
    new ResponseBuilder()
      .setStatus(201)
      .setMessage("File Saved Successfully")
      .setBody({
        show: updated[1].toJSON(),
      })
      .build()
  );
};

exports.addShow = async (req, res) => {
  const showId = req.query.id;
  if (!showId) {
    return res
      .status(400)
      .json(
        new ResponseBuilder().setStatus(400).setMessage("Bad Request").build()
      );
  }

  try {
    const { data: showData } = await axios.get(
      `/tv/${showId}?append_to_response=videos,credits`
    );

    let genres = [];
    if (showData.genres.length > 0) {
      genres = showData.genres.map((el) => {
        return el.name;
      });
    }

    let crew = [];
    if (showData.credits.cast.length > 0) {
      crew = showData.credits.cast.slice(0, 10).map((el) => {
        return {
          name: el.name,
          character: el.character,
        };
      });
    }

    let trailer = "";
    if (showData.videos.results.length > 0) {
      trailer = showData.videos.results.filter((el) => {
        return el.type === "Trailer";
      })[0]?.key;
    }

    let studio = "";
    if (showData.production_companies.length > 0) {
      studio = showData.production_companies[0].name;
    }

    let seasonNumbers = [];
    showData.seasons.forEach((el) => {
      seasonNumbers.push(`season/${el.season_number}`);
    });

    try {
      let reqPath = `/tv/${showId}?append_to_response=`;
      seasonNumbers.forEach((el, idx) => {
        if (idx >= 20) return;
        reqPath = reqPath.concat(el, ",");
      });
      const { data: seasonData } = await axios.get(reqPath);

      seasonNumbers.forEach((el, idx) => {
        if (idx >= 20) return;
        showData.seasons[idx].episodes = seasonData[el].episodes;
      });
    } catch (err) {
      console.error("Episode Fetch Error", err);
      res.status(500).json({
        status: 500,
        message: "Cannot Create Show",
      });
    }

    try {
      const newShow = await shows.create({
        name: showData.original_name,
        description: showData.overview,
        lang: showData.original_language.toUpperCase(),
        tagline: showData.tagline,
        poster: showData.poster_path,
        rating: showData.vote_average,
        createdAt: showData.first_air_date,
        adult: showData.adult,
        genres: genres,
        crew: crew,
        trailer: trailer,
        studio: studio,
        runtime: showData.episode_run_time[0].toString(),
        backdrop: showData.backdrop_path,
        seasons: showData.seasons,
      });

      res.status(201).json(
        new ResponseBuilder()
          .setStatus(201)
          .setMessage("Show Created Successfully")
          .setBody({
            movie: newShow.toJSON(),
          })
          .build()
      );
    } catch (e) {
      console.error(e);
      res
        .status(500)
        .json(
          new ResponseBuilder()
            .setStatus(500)
            .setMessage("Cannot Create Show")
            .build()
        );
    }
  } catch (e) {
    res
      .status(500)
      .json(
        new ResponseBuilder()
          .setStatus(500)
          .setMessage("Cannot Create Show")
          .build()
      );
  }
};
