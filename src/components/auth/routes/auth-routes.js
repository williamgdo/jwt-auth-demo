const express = require("express");
const router = new express.Router();
const bcrypt = require("bcrypt");
const {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
} = require("../../../libraries/jwt");

let { tokensDB, usersDB } = require("../data-access/db");

router.post("/login", async (req, res) => {
  const { name, password } = req.body;

  const user = usersDB.find((user) => user.name === name);

  if (user == null) {
    return res.status(400).send("Cannot find user");
  }

  if (password == null) {
    return res.status(400).send("Invalid password");
  }

  try {
    if ((await bcrypt.compare(password, user.password)) == false)
      return res.status(401).send("Invalid password or username");
  } catch (error) {
    console.error("[Error at creating /login]: " + err.message);
    res.sendStatus(500);
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  tokensDB.push(refreshToken);

  res.json({ accessToken, refreshToken });
});

router.delete("/logout", (req, res) => {
  const { refreshToken } = req.body;

  if (refreshToken == null) return res.sendStatus(400);

  tokensDB = tokensDB.filter((token) => token !== refreshToken);

  res.sendStatus(204);
});

router.post("/refresh-token", (req, res) => {
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

router.get("/refresh-tokens", (req, res) => {
  res.json(tokensDB);
});

module.exports = router;
