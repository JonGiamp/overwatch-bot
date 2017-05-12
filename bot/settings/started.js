/* eslint camelcase: OFF */

module.exports = (bot) => {
  bot.setGetStartedButton((payload, chat) => {
    chat.getUserProfile().then(({ first_name }) => {
      chat.say(`Salut ${first_name} ! Moi c'est BotOW, on m'a créé pour donner les statistiques des joueurs Overwatch.`);
      chat.say('Pour ça rien de plus simple, envoi le mot clè \'recherche\' suivit de l\'identifiant d\'un joueur et je m\'occupe du reste ! ;)');
    });
  });
};
