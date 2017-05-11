const input = [/^h(i|e(y|llo))/i,/^bon(jour|soir)/i,/yo+/i,/sa+lu+t/i,/goo+d(-| )+(mo+rning|afternon|evening)/i,'wesh'];
const output = ['Hello','Hey','Hi'];

const getAnswer = array => array[Math.floor(Math.random() * array.length)];

module.exports = bot => {
  bot.hear(input, (payload, chat) => {
    chat.getUserProfile().then((user) => {
      const hello = getAnswer(output);
      chat.say(`${hello} ${user.first_name} !`);
    });
  });
};
