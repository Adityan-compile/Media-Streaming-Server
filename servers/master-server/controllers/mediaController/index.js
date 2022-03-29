const {
  movies,
  highlights,
  shows,
  Sequelize,
  watching,
} = require("../../models");
const streamer = require("express-stream-video");
const ResponseBuilder = require("../../utils/response");

exports.getMovies = async (req, res) => {
  try {
    const results = await movies.findAll({});
    res.status(200).json(
      new ResponseBuilder()
        .setStatus(200)
        .setBody({
          movies: results,
        })
        .build()
    );
  } catch (e) {
    res
      .status(500)
      .json(
        new ResponseBuilder()
          .setStatus(500)
          .setMessage("Error Getting Movies")
          .build()
      );
  }
};

exports.getShows = async (req, res) => {
  try {
    const results = await shows.findAll({});
    res.status(200).json(
      new ResponseBuilder()
        .setStatus(200)
        .setBody({
          shows: results,
        })
        .build()
    );
  } catch (e) {
    res
      .status(500)
      .json(
        new ResponseBuilder()
          .setStatus(500)
          .setMessage("Error Getting Shows")
          .build()
      );
  }
};

exports.streamMovie = (req, res) => {
  const filename = req.query.file;

  if (!filename) {
    return res
      .status(400)
      .json(
        new ResponseBuilder()
          .setStatus(400)
          .setMessage("Bad Request, Filename Required")
          .build()
      );
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
    res.status(200).json(
      new ResponseBuilder()
        .setStatus(200)
        .setBody({
          highlights: results,
        })
        .build()
    );
  } catch (e) {
    res
      .status(500)
      .json(
        new ResponseBuilder()
          .setStatus(500)
          .setMessage("Error Getting Highlights")
          .build()
      );
  }
};

exports.createHighlight = async (req, res) => {
  const body = req.body;
  if (!body || Object.keys(body).length === 0) {
    return res
      .status(400)
      .json(
        new ResponseBuilder().setStatus(400).setMessage("Bad Request").build()
      );
  }
  try {
    const count = await highlights.count();
    if (count >= 5) {
      return res
        .status(422)
        .json(
          new ResponseBuilder()
            .setStatus(422)
            .setMessage("Maximum Number of Highlights reached")
        );
    }
  } catch (err) {
    return res
      .status(500)
      .json(
        new ResponseBuilder()
          .setStatus(500)
          .setMessage("Error Creating Highlight")
          .build()
      );
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
      raw: true,
    });

    res.status(200).json(
      new ResponseBuilder()
        .setStatus(200)
        .setMessage("Highlight Created")
        .setBody({
          highlight: newHighlight,
        })
    );
  } catch (e) {
    console.error(e);
    res
      .status(500)
      .json(
        new ResponseBuilder()
          .setStatus(500)
          .setMessage("Error Creating Highlight")
          .build()
      );
  }
};

exports.deleteHighlight = async (req, res) => {
  const id = req.query.id;
  if (!id)
    return res
      .status(400)
      .json(
        new ResponseBuilder().setStatus(400).setMessage("Bad Request").build()
      );

  try {
    await highlights.destroy({
      where: {
        id,
      },
    });
    res
      .status(204)
      .json(
        new ResponseBuilder()
          .setStatus(204)
          .setMessage("Highlight Deleted")
          .build()
      );
  } catch (err) {
    res
      .status(500)
      .json(
        new ResponseBuilder()
          .setStatus(400)
          .setMessage("Failed to Delete Highlight")
          .build()
      );
  }
};

exports.search = async (req, res) => {
  const query = req.query.q;

  if (!query) {
    return res
      .status(400)
      .json(
        new ResponseBuilder().setStatus(400).setMessage("Bad Request").build()
      );
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

    return res.status(200).json(
      new ResponseBuilder()
        .setStatus(200)
        .setMessage("Search Successful")
        .setBody({
          results: compiled_results,
        })
        .build()
    );
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json(
        new ResponseBuilder()
          .setStatus(500)
          .setMessage("Database Query Error")
          .build()
      );
  }
};

exports.deleteMovie = async (req, res) => {
  const id = req.query.id;

  if (!id) {
    return res
      .status(400)
      .json(
        new ResponseBuilder().setStatus(400).setMessage("Bad Request").build()
      );
  }

  try {
    await movies.destroy({
      where: {
        id: id,
      },
    });
    res
      .status(204)
      .json(
        new ResponseBuilder().setStatus(204).setMessage("Movie Deleted").build()
      );
  } catch (err) {
    res
      .status(500)
      .json(
        new ResponseBuilder()
          .setStatus(500)
          .setMessage("Cannot Delete Movie")
          .build()
      );
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

    return res.status(200).json(
      new ResponseBuilder()
        .setStatus(200)
        .setMessage("Search Success")
        .setBody({
          results: {
            movies: movie_results,
            shows: show_results,
          },
        })
        .build()
    );
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json(
        new ResponseBuilder()
          .setStatus(500)
          .setMessage("Database Query Error")
          .build()
      );
  }
};

exports.setWatching = async (req, res) => {
  const body = req.body;
  const user = req.user;

  if (!body || Object.keys(body).length === 0) {
    return res
      .status(400)
      .json(
        new ResponseBuilder().setStatus(400).setMessage("Bad Request").build()
      );
  }

  try {
    const count = await watching.count({
      where: {
        mediaId: body.id,
      },
    });

    if (count > 0) {
      const updated = await watching.update(
        {
          timestamp: body.timestamp,
        },
        {
          where: {
            mediaId: body.id,
            user: user.id,
          },
        }
      );

      return res
        .status(200)
        .json(
          new ResponseBuilder()
            .setStatus(200)
            .setMessage("Watching List Updated")
            .setBody({ updated })
        );
    }

    const added = await watching.create({
      user: user.id,
      timestamp: body.timestamp,
      filename: body.filename,
      mediaType: body.type,
      mediaId: body.id,
      title: body.title,
      poster: body.poster,
    });

    return res
      .status(200)
      .json(
        new ResponseBuilder()
          .setStatus(200)
          .setMessage("Watching List Updated")
          .setBody({ added: added.toJSON() })
      );
  } catch (err) {
    return res
      .status(500)
      .json(
        new ResponseBuilder()
          .setStatus(500)
          .setMessage("Database Error")
          .build()
      );
  }
};
exports.resetWatching = async (req, res) => {
  const body = req.body;
  const user = req.user;

  if (!body || Object.keys(body).length === 0) {
    return res
      .status(400)
      .json(
        new ResponseBuilder().setStatus(400).setMessage("Bad Request").build()
      );
  }

  try {
    await watching.destroy({
      where: {
        mediaId: body.id,
        user: user.id,
      },
    });

    return res
      .status(200)
      .json(new ResponseBuilder().setStatus(200).setMessage("Watching Reset"));
  } catch (err) {
    return res
      .status(500)
      .json(
        new ResponseBuilder()
          .setStatus(500)
          .setMessage("Database Error")
          .build()
      );
  }
};

exports.getWatching = async (req, res) => {
  try {
    const watchingList = await watching.findAll({
      where: {
        user: req.user.id,
      },
    });
    return res
      .status(200)
      .json(new ResponseBuilder().setStatus(200).setBody(watchingList));
  } catch (err) {
    return res
      .status(500)
      .json(
        new ResponseBuilder()
          .setStatus(500)
          .setMessage("Database Error")
          .build()
      );
  }
};
