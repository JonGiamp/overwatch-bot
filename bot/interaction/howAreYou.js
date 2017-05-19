const input = [/^[çsc]?a\s*va\s*.*\?/i, /^what(s|('s))?\s*up/i, /^bien\s*.*?/i, /^good\s*.*?/i, /^how\s*(are?|r)\s*(yo)?u/i];
const output = [
  'Je suis au top 👍🔥 et toi ?',
  'Ça va merci 😃 et toi ?',
];

const getRand = array => array[Math.floor(Math.random() * array.length)];

module.exports = (bot) => {
  bot.hear(input, (payload, chat) => {
    const response = getRand(output);
    chat.say(response);
  });
};
