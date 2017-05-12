const Bootbot = require('bootbot');
const { accessToken, verifyToken, appSecret } = require('./bot/key');
const { started, greeting, persistent } = require('./bot/settings');
const { hello, search, help, uncatch } = require('./bot/interaction');

// TODO:
// - REWRITE SEARCH INTERACTION
//    FIX Promise error, UnhandledPromiseRejectionWarning: Unhandled promise
//    rejection (rejection id: 1): SyntaxError: Unexpected token N in JSON at position 0

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

bot.start(process.env.PORT || 1415);
