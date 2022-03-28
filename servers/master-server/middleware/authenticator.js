const axios = require("axios");
const { SECRET_KEY } = process.env;
const ResponseBuilder = require("../utils/response");

module.exports = {
  authenticate: (req, res, next) => {
    const token = req.cookies.accessToken;

    if (!token)
      return res.status(401).json(new ResponseBuilder().setStatus(401).setMessage("Authorization Credentials Required"));

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
          return res.status(401).json(new ResponseBuilder().setStatus(401).setMessage("Unauthorized"));
        }
        return res
          .status(503)
          .json(new ResponseBuilder().setStatus(503).setMessage("Authentication Server Unavailable"));
      });
  },
};
