const express = require("express");
const app = express();
const { authenticateAccessToken } = require("../../middleware/authentication");
const { messagesDB } = require("./data-access/db");

app.use(express.json());

const port = 3000;

app.get("/msgs", authenticateAccessToken, (req, res) => {
  res.json(messagesDB.filter((msg) => msg.username === req.user.name));
});

app.post("/msgs", authenticateAccessToken, (req, res) => {
  const newMessage = {
    username: req.user.name,
    message: req.body.message,
  };

  messagesDB.push(newMessage);

  res.sendStatus(201);
});

// standalone server:
// console.log(`Server listening on port ${PORT}...`);
// app.listen(PORT);

module.exports = { app, port };
