const express = require('express');
const Bootbot = require('bootbot');
// const { accessToken, verifyToken, appSecret } = require('./bot/key');
const { started, greeting, persistent } = require('./bot/settings');
const { hello, search, help, presentation } = require('./bot/interaction');

const app = express();

const bot = new Bootbot({
  accessToken: 'EAAGJU2B3gHkBAPhQaPEHNNDVien0zfnCO2rTx0hDs2AssGeyaNZC2xLVM4i5iKDQZBW82z4Yv3O9FevA2iLKo3Tc3JPlZBdBaNpTzU8yoEUTPcMSsx7FNVteQ3jZA87Ycf9JwkEaYdVZCixpqADMMf8VZAsCSc0ZBfnSIgWHO5a1wZDZD',
  verifyToken: 'TEST_BOT_TOKEN',
  appSecret: 'e8e95a50ad0fe8f9698d802af34fb76e',
});

// settings
bot.module(started);
bot.module(greeting);
bot.module(persistent);

// interaction
bot.module(presentation);
bot.module(help);
bot.module(search);
bot.module(hello);

app.get('/', (req, res) => res.send('Ce service est le chatbot de BLABLA, il est destiné à être utilisé sur messenger. Vous pouvez interagir avec lui ici : BLABLA'));

bot.start(process.env.PORT || 1415);
