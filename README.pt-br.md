# Autenticação JWT

[![en](https://img.shields.io/badge/lang-en-red.svg)](https://github.com/williamgdo/jwt-auth-demo/blob/main/README.md)
[![pt-br](https://img.shields.io/badge/lang-pt--br-green.svg)](https://github.com/williamgdo/jwt-auth-demo/blob/main/README.pt-br.md)

Este aplicativo inclui arquivos .rest para a extensão [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client), publicada por Huachao Mao, para facilitar consultas em ambos os servidores (o aplicativo e o servidor de autenticação). Também foi disponibilizado um arquivo .json com algumas das rotas pré-configuradas para testes no programa Postman.

## Como gerar uma chave secreta simples para o arquivo .env?

Você pode usar o módulo crypto do Node.js para gerar uma chave secreta:

```js
require("crypto").randomBytes(64).toString("hex");
```

Não se esqueça de gerar duas chaves (uma para o token de acesso e outra para o token de atualização).

## Por que separar o Servidor e o Servidor de Autorização?

O primeiro motivo é mostrar que o token JWT pode ser compartilhado entre vários servidores, permitindo que a autorização seja compartilhada entre várias aplicações, por exemplo. O segundo motivo é separar as responsabilidades dos servidores, uma vez que o Servidor de Autenticação lida com a criação, exclusão e atualização de tokens, enquanto o outro servidor lida com todas as operações relacionadas à API (neste exemplo, ele obtém mensagens de texto para um usuário específico). Dessa forma, você pode dimensionar o servidor de autenticação e modificar o servidor de aplicativos sem que um afete o outro.

## Como funciona o token de atualização?

Se o JWT tiver um tempo de expiração, o token de atualização pode ser usado para atualizar o tempo do token. O token de atualização deve ser armazenado em um banco de dados e deve ser excluído quando um usuário fizer logout. Neste simples exemplo, o token de atualização é armazenado em um array.
