const express = require("express");
const app = express();
app.use(express.json());

const authRoutes = require("./routes/auth-routes");
const userRoutes = require("./routes/user-routes");

app.use(authRoutes);
app.use("/users", userRoutes);

const port = 4000;

// standalone server:
// console.log(`Authentication server listening on port ${port}...`);
// app.listen(port);

module.exports = { app, port };
