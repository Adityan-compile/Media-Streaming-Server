const express = require("express");
const router = express.Router();

const {
  saveServerSettings,
  getServerSettings,
} = require("../controllers/settingsController");
const authenticator = require("../middleware/authenticator");
router.post("/server/settings/save", saveServerSettings);
router.get("/server/settings", authenticator.authenticate, getServerSettings);

module.exports = router;
