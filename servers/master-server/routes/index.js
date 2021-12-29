const express = require("express");
const router = express.Router();

const {saveServerSettings} = require("../controllers/settingsController");

router.post("/server/settings/save",saveServerSettings);

module.exports = router;
