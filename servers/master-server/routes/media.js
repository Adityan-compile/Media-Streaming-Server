const express = require("express");
const router = express.Router();
const { addMovie, addShow } = require("../controllers/uploadController");
const { searchMovies } = require("../controllers/tmdbController");
const  { getMovies } = require("../controllers/mediaController");
const authenticator = require("../middleware/authenticator");

router
  .route("/tmdb/movies/search")
  .get(authenticator.authenticate, searchMovies);

router.route("/movies/new").post(authenticator.authenticate, addMovie);

router.route("/shows/new").post(authenticator.authenticate, addShow);

router.route("/movies/all").get(authenticator.authenticate, getMovies);

module.exports = router;
