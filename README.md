# JWT Auth

[![en](https://img.shields.io/badge/lang-en-red.svg)](https://github.com/williamgdo/jwt-auth-demo/blob/main/README.md)
[![pt-br](https://img.shields.io/badge/lang-pt--br-green.svg)](https://github.com/williamgdo/jwt-auth-demo/blob/main/README.pt-br.md)

This app includes .rest files for the extension [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client), published by Huachao Mao, for easier querying in both servers (the app and the authentication server). There is also a json file called api-postman.json that can be imported into Postman for testing purposes.

## How to generate a simple Secret Key for the .env?

You can use Node's crypto module to generate a secret key:

```js
require("crypto").randomBytes(64).toString("hex");
```

Don't forget to generate two keys (one for the access token and one for the refresh token).

## Why separate Server and Authorization Server?

The first use is to show that the JWT token can be shared across multiple servers, allowing authorization to be shared across multiple applications, for instance. The second use is to separate the concerns of the servers, since the Auth Server handle all the creation, deletion and refreshing of tokens and the other server handle all the API related operations (in this demo, it retrieves texts messages for a specific user). This way, you can scale the auth server and modify the application server without one affecting the other.

## How does the refresh token works?

If the JWT has an expiration time, the refresh token can be used to refresh the token time. The refresh token should be stored in a database and should be deleted when a user makes a logout. In this simple demo, the refresh token is stored in a array.
