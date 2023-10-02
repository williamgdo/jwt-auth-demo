const express = require("express");
const app = express();
app.use(express.json());

const {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
} = require("../../libraries/jwt");

let { tokensDB } = require("./data-access/db");

const port = 4000;

app.post("/login", (req, res) => {
  const { username } = req.body;

  const user = { name: username };

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  tokensDB.push(refreshToken);

  res.json({ accessToken, refreshToken });
});

app.post("/refresh-token", (req, res) => {
  const { refreshToken } = req.body;

  if (refreshToken == null) return res.sendStatus(401);

  if (!tokensDB.includes(refreshToken)) return res.sendStatus(403);

  const { err, data } = verifyToken(refreshToken, "refreshToken");

  if (err != null) {
    console.log(err);
    return res.sendStatus(403);
  }

  const accessToken = generateAccessToken({ name: data.name });
  res.json(accessToken);
});

app.delete("/logout", (req, res) => {
  const { refreshToken } = req.body;

  if (refreshToken == null) return res.sendStatus(400);

  tokensDB = tokensDB.filter((token) => token !== refreshToken);

  res.sendStatus(204);
});

app.get("/refresh-tokens", (req, res) => {
  res.json(tokensDB);
});

// standalone server:
// console.log(`Authentication server listening on port ${port}...`);
// app.listen(port);

module.exports = { app, port };
