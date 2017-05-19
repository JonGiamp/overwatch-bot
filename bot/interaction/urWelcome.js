const { getRand } = require('../utility');

const gifs = [
  '731ad2d8dea402e53c5a16d81a85769d',
  '3f3ca66d9ff672d29d048bbaa3f92fa5',
  'd3251d4c56a3e5831b3ebe6ae4f928b1',
  '264be2dfac82adfcf63e1594cdda4572',
  'df8eb98d0226cec034537f23fc034dec',
  'afb01c005e4dc07bc78da4993635a3ca',
];
const input = [/^th(an)*ks/i, /^merci/i, /^thx/i];
const output = {
  attachment: 'image',
  url: `https://media.tenor.co/images/${getRand(gifs)}/tenor.gif`,
};

module.exports = (bot) => {
  bot.hear(input, (payload, chat) => chat.say(output));
};
