const { POST_HELP } = require('../payload');

const input = [/help[ -]*(me)*/, /so+s/, 'aidez-moi', POST_HELP];

module.exports = (bot) => {
  bot.hear(input, (payload, chat) => {
    chat.getUserProfile().then((user) => {
      chat.say(`Pas de panique ${user}, donne moi juste le pseudo d'un joueur et moi je m'occupe du reste ! :)`);
    });
  });
};
