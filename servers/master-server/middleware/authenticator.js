const axios = require("axios");
const { SECRET_KEY } = process.env;

module.exports = {
  authenticate: (req, res, next) => {
    const token = req.cookies.accessToken;

    if (!token)
      return res.status(401).json({
        status: 401,
        message: "Authorization Credentials Required",
      });

    axios
      .post(
        "http://auth-server/api/auth/tokens/access/verify",
        {
          token: token,
        },
        {
          headers: {
            SECRET_KEY,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        req.user = res.user;
        return next();
      })
      .catch((e) => {
        if (e.response.status === 401) {
          return res.status(401).json({ status: 401, messge: "Unauthorized" });
        }
        return res
          .status(503)
          .json({ status: 503, message: "Authentication Server Unavailable" });
      });
  },
};
