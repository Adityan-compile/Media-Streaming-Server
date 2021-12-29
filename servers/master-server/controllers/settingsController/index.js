const { server } = require("../../models");
const { isIncluded } = require("../../utils");

exports.saveServerSettings = async(req, res) => {
  const secretKey = req.headers["SECRET_KEY"];
  const body = req.body;
  const keys = Object.keys(body);

  if (!secretKey)
    return res.status(401).json({
      status: 401,
      message: "Unauthorized",
    });

  if (secretKey !== process.env.SECRET_KEY)
    return res.status(403).json({
      status: 403,
      message: "Forbidden",
    });

  if (
    !body ||
    keys.length < 4 ||
    !isIncluded(["videoQuality", "audioQuality", "tmdbKey", "name"], keys)
  )
    return res.status(400).json({
      status: 400,
      message: "Bad Request",
    });

    try {
        await server.create(body);
        res.status(200).json({
            status: 200,
            message: "Server Settings Saved Successfully"
        });
    } catch (e) {
        res.status(500).json({
            status: 500,
            message: "Error Saving Server Settings"
        });
    }

};
