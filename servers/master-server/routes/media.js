const express = require('express');
const router = express.Router();
const {addMovie, addShow} = require("../controllers/uploadController");
const authenticator = require("../middleware/authenticator");

router.post('/movies/new', authenticator.authenticate, addMovie);

router.post('/shows/new', authenticator.authenticate, addShow);

module.exports = router;
