const express = require('express');
const router = express.Router();
const {addMovie, addShow} = require("../controllers/uploadController");
const {searchMovies} = require('../controllers/tmdbController');
const authenticator = require("../middleware/authenticator");

router.route('/tmdb/movies/search').get(authenticator.authenticate, searchMovies);

router.post('/movies/new', authenticator.authenticate, addMovie);

router.post('/shows/new', authenticator.authenticate, addShow);

module.exports = router;
