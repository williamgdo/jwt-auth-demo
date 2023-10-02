const jwt = require("jsonwebtoken");
const { verifyToken } = require("../libraries/jwt");

function authenticateAccessToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  const { err, data } = verifyToken(token, "accessToken");

  if (err != null) {
    console.log(err);
    return res.sendStatus(403);
  }

  req.user = data;
  next();
}

module.exports = {
  authenticateAccessToken,
};
