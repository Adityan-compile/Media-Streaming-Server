const { movies, highlights, shows, Sequelize } = require("../../models");
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

exports.getShows = async (req, res) => {
  try {
    const results = await shows.findAll({});
    res.status(200).json({
      status: 200,
      shows: results,
    });
  } catch (e) {
    res.status(500).json({ status: 500, message: "Error Getting Shows" });
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
    const results = await highlights.findAll({
      raw: true,
      include: ["Movie", "Show"],
    });
    res.status(200).json({
      status: 200,
      highlights: results,
    });
  } catch (e) {
    console.error(e);
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
    const created = await highlights.create({
      highlightType: body.highlightType,
      movie: body.highlightType === "movie" ? body.highlight : null,
      show: body.highlightType === "show" ? body.highlight : null,
    });

    const newHighlight = await highlights.findAll({
      where: { id: created.id },
      include: ["Movie", "Show"],
      raw: true
    });

    res.status(200).json({
      status: 200,
      message: "Highlight Created",
      highlight: newHighlight,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      status: 500,
      message: "Error Creating Highlight",
    });
  }
};

exports.deleteHighlight = async (req,res)=>{
  const id = req.query.id;
  if(!id) return res.status(400).json({
    status: 400,
    message: "Bad Request"
  });

  try {
    await highlights.destroy({
      where: {
        id
      }
    });
    res.status(204).json({
      status: 204,
      message: "Highlight Deleted"
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Failed to Delete Highlight",
      id
    }); 
  }


}

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
        name: {
          [Sequelize.Op.iLike]: `%${query.toLowerCase()}%`,
        },
      },
      limit: 50,
    });

    const show_results = await shows.findAll({
      where: {
        name: {
          [Sequelize.Op.iLike]: `%${query.toLowerCase()}%`,
        },
      },
      limit: 50,
    });

    // Combine and Compile the  Shows and Movies Found to Return the Most Relevent Results
    const combined = movie_results.concat(show_results);

    const query_regex = new RegExp(query, "i");

    const compiled_results = combined.filter((el) => query_regex.test(el.name));

    return res.status(200).json({
      status: 200,
      message: "Search Successful",
      results: compiled_results,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: 500,
      message: "Database Query Error",
    });
  }
};

exports.deleteMovie = async (req, res) => {
  const id = req.query.id;

  if (!id) {
    return res.status(400).json({
      status: 400,
      message: "Bad Request",
    });
  }

  try {
    await movies.destroy({
      where: {
        id: id,
      },
    });
    res.status(204).json({
      status: 204,
      message: "Movie Deleted",
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Cannot Delete Movie",
    });
  }
};

exports.getTopRated = async (req, res) => {
  try {
    const movie_results = await movies.findAll({
      order: [["rating", "DESC"]],
      limit: 10,
    });

    const show_results = await shows.findAll({
      order: [["rating", "DESC"]],
      limit: 10,
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
    console.error(err);
    return res.status(500).json({
      status: 500,
      message: "Database Query Error",
    });
  }
};
