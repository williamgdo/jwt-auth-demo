const jwt = require("jsonwebtoken");

const SECRET_ENUM = {
  accessToken: process.env.ACCESS_TOKEN_SECRET,
  refreshToken: process.env.REFRESH_TOKEN_SECRET,
};

/**
 * @param {string} token - The token to be verified
 * @param {"accessToken" | "refreshToken"} tokenType - The type of the token (either accessToken or refreshToken)
 */
function verifyToken(token, tokenType) {
  let data = null,
    err = null;

  if (tokenType !== "refreshToken" && tokenType !== "accessToken") {
    console.error("[Error at verifyToken]: Invalid token type.");
    err = "Invalid token type.";
  }

  const secret = SECRET_ENUM[tokenType];

  jwt.verify(token, secret, (_err, _data) => {
    if (_err) {
      console.error("[Error at verifyToken]: ", _err.message);
      err = _err;
    }

    data = _data;
  });
  return { err, data };
}

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15s" });
}

function generateRefreshToken(user) {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
};
