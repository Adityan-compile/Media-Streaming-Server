const { server } = require("../../models");
const { isIncluded } = require("../../utils");
const { serverSettingsDump } = require("../../utils/settings");
const ResponseBuilder = require("../../utils/response");

exports.saveServerSettings = async (req, res) => {
  const secretKey = req.headers["secret_key"];
  const body = req.body;
  const keys = Object.keys(body);

  if (!secretKey)
    return res
      .status(401)
      .json(
        new ResponseBuilder().setStatus(401).setMessage("Unauthorized").build()
      );

  if (secretKey !== process.env.SECRET_KEY)
    return res
      .status(403)
      .json(
        new ResponseBuilder().setStatus(403).setMessage("Forbidden").build()
      );

  if (
    !body ||
    keys.length < 4 ||
    !isIncluded(["videoQuality", "audioQuality", "tmdbKey", "name"], keys)
  )
    return res
      .status(400)
      .json(
        new ResponseBuilder().setStatus(400).setMessage("Bad Request").build()
      );

  try {
    await server.create(body);
    res
      .status(200)
      .json(
        new ResponseBuilder()
          .setStatus(200)
          .setMessage("Server Settings Saved")
          .build()
      );
  } catch (e) {
    res
      .status(500)
      .json(
        new ResponseBuilder()
          .setStatus(500)
          .setMessage("Error Saving Server Settings")
          .build()
      );
  }
};

exports.getServerSettings = (req, res) => {
  res.status(200).json(
    new ResponseBuilder()
      .setStatus(200)
      .setBody({
        settings: serverSettingsDump,
      })
      .build()
  );
};
