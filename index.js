const app = require('express')();
const Bootbot = require('bootbot');
const { accessToken, verifyToken, appSecret } = require('./bot/key');
const { started, greeting, persistent } = require('./bot/settings');
const { hello, search, help, uncatch } = require('./bot/interaction');

// TODO:
// FIX Promise error, UnhandledPromiseRejectionWarning: Unhandled promise rejection (rejection id: 1): SyntaxError: Unexpected token N in JSON at position 0
// SEA Why require Bootbot object doesn't work

// DO
// Use await/async to fix problem message order

const bot = new Bootbot({
  accessToken,
  verifyToken,
  appSecret,
});

// settings
bot.module(started);
bot.module(greeting);
bot.module(persistent);

// interaction
bot.module(help);
bot.module(search);
bot.module(hello);
bot.module(uncatch);

app.get('/', (req, res) => res.send('Ce service est le chatbot de BLABLA, il est destiné à être utilisé sur messenger. Vous pouvez interagir avec lui ici : BLABLA'));

bot.start(process.env.PORT || 1415);
