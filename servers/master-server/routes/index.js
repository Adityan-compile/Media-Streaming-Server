const express = require("express");
const router = express.Router();
const ResponseBuilder = require("../utils/response");
const { getServerStats } = require("../utils/index");
const {
  saveServerSettings,
  getServerSettings,
} = require("../controllers/settingsController");

const authenticator = require("../middleware/authenticator");

const pingRoute = async (req, res) => {
  res.status(200).json(
    new ResponseBuilder()
      .setStatus(200)
      .setMessage("Pong")
      .setBody({
        server: { stats: await getServerStats() },
      })
  );
};

router.post("/server/settings/save", saveServerSettings);
router.get("/server/settings", authenticator.authenticate, getServerSettings);

router.route("/server/ping").get(pingRoute);

module.exports = router;
