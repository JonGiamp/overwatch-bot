/* eslint camelcase: OFF */

module.exports = (bot) => {
  bot.setGetStartedButton((payload, chat) => {
    chat.getUserProfile().then(async ({ first_name }) => {
      await chat.say(`Salut ${first_name} ! Moi c'est BotOW, on m'a créé pour donner les statistiques des joueurs Overwatch.`);
      await chat.say('Pour ça rien de plus simple, envoi le mot clè "recherche" suivit de l\'identifiant d\'un joueur et je m\'occupe du reste ! ;)');
    });
  });
};
