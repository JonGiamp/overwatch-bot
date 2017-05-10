const iHello = [/^h(i|e(y|llo))/i,/^bon(jour|soir)/i,/yo+/i,/sa+lu+t/i,/goo+d(-| )+(mo+rning|afternon|evening)/i,'wesh'];
const oHello = ['Hello','Hey','Hi'];

const getAnswer = array => array[Math.floor(Math.random() * array.length)];

module.exports = bot => {
  bot.hear(iHello, (payload, chat) => {
    chat.getUserProfile().then((user) => {
      chat.say(`${getAnswer(oHello)} ${user.first_name} !`);
    });
  });
};
