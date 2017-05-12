const { POST_STARTED } = require('../payload');

module.exports = (bot) => {
  bot.hear(POST_STARTED, (payload, chat) => {
    chat.getUserProfile().then((user) => {
      chat.say(`Salut ${user} ! Moi c'est BotOW, on m'a créé pour donner les statistiques des joueurs Overwatch.`);
      chat.say('Pour ça rien de plus simple, envoi moi un identifiant de joueur et je m\'occupe du reste ! ;)');
    });
  });
};
