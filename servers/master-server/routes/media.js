const express = require("express");
const router = express.Router();
const {
  addMovie,
  addShow,
  uploadMovieFile,
} = require("../controllers/uploadController");
const { searchMovies, searchShows } = require("../controllers/tmdbController");
const {
  getMovies,
  streamMovie,
  search,
  getHighlights,
  createHighlight,
  deleteMovie,
  getTopRated,
  getShows,
  deleteHighlight,
  getWatching,
  setWatching,
} = require("../controllers/mediaController");
const authenticator = require("../middleware/authenticator");
const { checkMovie } = require("../middleware/check");
const multer = require("../config/multer");

router
  .route("/tmdb/movies/search")
  .get(authenticator.authenticate, searchMovies);

router.route("/tmdb/shows/search").get(authenticator.authenticate, searchShows);

router.route("/movies/new").post(authenticator.authenticate, addMovie);

router.route("/shows/new").post(authenticator.authenticate, addShow);

router.route("/movies/all").get(authenticator.authenticate, getMovies);

router.route("/shows/all").get(authenticator.authenticate, getShows);

router
  .route("/movies/upload")
  .post(
    [authenticator.authenticate, checkMovie, multer.single("file")],
    uploadMovieFile
  );

router.route("/movies/stream").get([authenticator.authenticate], streamMovie);

router
  .route("/movies/delete")
  .delete([authenticator.authenticate], deleteMovie);

router.route("/search").get([authenticator.authenticate], search);

router.route("/highlights").get([authenticator.authenticate], getHighlights);

router
  .route("/highlights/new")
  .post([authenticator.authenticate], createHighlight);

router
  .route("/highlights/delete")
  .delete([authenticator.authenticate], deleteHighlight);

router.route("/toprated").get([authenticator.authenticate], getTopRated);

router.route("/watching/all").get([authenticator.authenticate], getWatching);

router.route("/watching/update").post([authenticator.authenticate], setWatching);

module.exports = router;
