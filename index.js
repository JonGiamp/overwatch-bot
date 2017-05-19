const Bootbot = require('bootbot');
const { accessToken, verifyToken, appSecret } = require('./bot/key');
const { started, greeting, persistent } = require('./bot/settings');
const { hello, search, helpMessage, helpPostback, uncatch, bye, urWelcome, howAreYou } = require('./bot/interaction');

// TODO:
// - Think to workflow
// - Units test

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
bot.module(helpMessage);
bot.module(helpPostback);
bot.module(search);
bot.module(hello);
bot.module(bye);
bot.module(urWelcome);
bot.module(howAreYou);
bot.module(uncatch);

bot.start(process.env.PORT || 1415);
