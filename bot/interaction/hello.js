const input = [/^h(i|e(y|llo))/i, /^bon(jour|soir)/i, /^yo+/i, /^sa+lu+t/i, /^goo+d(-| )+(mo+rning|afternon|evening)/i, /^wesh/i];
const output = ['Hello', 'Hey', 'Hi', 'Salut'];

const getRandAnswer = array => array[Math.floor(Math.random() * array.length)];

module.exports = (bot) => {
  bot.hear(input, (payload, chat) => {
    chat.getUserProfile().then((user) => {
      const hello = getRandAnswer(output);
      chat.say(`${hello} ${user.first_name} 🙌`);
    });
  });
};
