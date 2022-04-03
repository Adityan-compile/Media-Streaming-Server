const express = require("express");
const router = express.Router();
const ResponseBuilder = require("../utils/response");
const os = require("os");
const {
  saveServerSettings,
  getServerSettings,
} = require("../controllers/settingsController");

const authenticator = require("../middleware/authenticator");

const pingRoute = (req, res) => {
  res.status(200).json(
    new ResponseBuilder().setStatus(200).setMessage("Pong").setBody({
      serverStats: {
        uptime: os.uptime(),
        loadAverage: os.loadavg(),
        platform: os.platform(),
        freeMem: os.freemem(),
        totalMem: os.totalmem()
      },
    })
  );
};

router.post("/server/settings/save", saveServerSettings);
router.get("/server/settings", authenticator.authenticate, getServerSettings);

router.route("/ping").get(pingRoute).post(pingRoute).delete(pingRoute);

module.exports = router;
