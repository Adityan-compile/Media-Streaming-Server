const { movies, highlights, shows } = require("../../models");
const streamer = require("express-stream-video");
const res = require("express/lib/response");

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

  streamer.stream(req, res, filePath);
};

exports.getHighlights = async (req, res) => {
  try {
    const results = await movies.findAll({});
    res.status(200).json({
      status: 200,
      highlights: results,
    });
  } catch (e) {
    res.status(500).json({ status: 500, message: "Error Getting Highlights" });
  }
};

exports.createHighlight = async (req, res) => {
  const body = req.body;
  if (!body || Object.keys(body).length === 0) {
    return res.status(400).json({
      status: 400,
      message: "Bad Request",
    });
  }

  try {
    const newHighlight = await highlights.create({
      highlightType: body.type,
      movie: body.type === "movie" ? body.highlight : "",
      show: body.type === "show" ? body.highlight : "",
    });

    res.status(200).json({
      status: 200,
      message: "Highlight Created",
      highlight: newHighlight.toJSON(),
    });
  } catch (e) {
    res.status(500).json({
      status: 500,
      message: "Error Creating Highlight",
    });
  }
};

exports.search = async (req, res) => {
  const query = req.query.q;

  if (!query) {
    return res.status(400).json({
      status: 400,
      message: "Bad Request",
    });
  }

  try {
    const movie_results = await movies.findAll({
      where: {
        $or: [
          {
            name: {
              $iLike: query,
            },
          },
        ],
      },
    });

    const show_results = await shows.findAll({
      where: {
        $or: [
          {
            name: {
              $iLike: query,
            },
          },
        ],
      },
    });

    return res.status(200).json({
      status: 200,
      message: "Search Successful",
      results: {
        movies: movie_results,
        shows: show_results,
      },
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "Database Query Error",
    });
  }
};
