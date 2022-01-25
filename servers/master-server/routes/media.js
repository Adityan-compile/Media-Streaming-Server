const express = require("express");
const router = express.Router();
const { addMovie, addShow, uploadMovieFile } = require("../controllers/uploadController");
const { searchMovies } = require("../controllers/tmdbController");
const  { getMovies, streamMovie } = require("../controllers/mediaController");
const authenticator = require("../middleware/authenticator");
const { checkMovie } = require("../middleware/check");
const multer = require("../config/multer");

router
  .route("/tmdb/movies/search")
  .get(authenticator.authenticate, searchMovies);

router
     .route("/movies/new")
     .post(authenticator.authenticate, addMovie);

router
     .route("/shows/new")
     .post(authenticator.authenticate, addShow);

router
     .route("/movies/all")
     .get(authenticator.authenticate, getMovies);

router
     .route('/movies/upload')
     .post([authenticator.authenticate, checkMovie, multer.single('file')], uploadMovieFile);

router.route('/movies/stream').get([authenticator.authenticate],streamMovie);

module.exports = router;
