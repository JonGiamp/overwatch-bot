const { getRand } = require('../utility');

const gifs = [
  '4d1267fbacc61e55a0f82c44ba16ec00',
  '0b423064fb6f568772708a12daf98cd1',
  '9448a1ba2729f3a2d999d66e5d188605',
  'a6d4ffb42e9cfa929a337b7fd12398e1',
  '4094a62736dab4837ced2ab59ec3f42d',
  '3fc8075202ccb2455ba1db8f88c0f8d8',
];
const input = [/^bye/i, /^bonne(-| )+soirée/i, /^goo+d(-| )*bye/i];
const output = {
  attachment: 'image',
  url: `https://media.tenor.co/images/${getRand(gifs)}/tenor.gif`,
};

module.exports = (bot) => {
  bot.hear(input, (payload, chat) => chat.say(output));
};
