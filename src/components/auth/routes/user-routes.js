const express = require("express");
const router = new express.Router();
const bcrypt = require("bcrypt");

let { usersDB } = require("../data-access/db");

router.get("/", (req, res) => {
  res.json(usersDB);
});

router.post("/", async (req, res) => {
  const { name, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = { name, password: hashedPassword };
    usersDB.push(user);

    res.sendStatus(201);
  } catch (err) {
    console.error("[Error at creating genSalt]: " + err.message);
    res.sendStatus(500);
  }
});

router.delete("/", (req, res) => {
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

module.exports = router;
