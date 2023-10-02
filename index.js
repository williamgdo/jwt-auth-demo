require("dotenv").config();

const { app, port } = require("./src/components/app/server");
const {
  app: authServer,
  port: authServerPort,
} = require("./src/components/auth/server");

console.log(`Server listening on port ${port}...`);
app.listen(port);

console.log(`Authentication server listening on port ${authServerPort}...`);
authServer.listen(authServerPort);
