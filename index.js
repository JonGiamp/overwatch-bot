const Bootbot = require('bootbot');
const { accessToken, verifyToken, appSecret } = require('./bot/key');
const { started, greeting, persistent } = require('./bot/settings');
const { hello, search, help, uncatch, bye, urWelcome } = require('./bot/interaction');

// TODO:
// - FIX HELP PERSISTENT MENU ?
// * Add default interaction with attachment, position etc...
// * Add 'cancel' quick replies
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
bot.module(help);
bot.module(search);
bot.module(hello);
bot.module(bye);
bot.module(urWelcome);
bot.module(uncatch);

bot.start(process.env.PORT || 1415);
