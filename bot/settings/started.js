/* eslint camelcase: OFF */

module.exports = (bot) => {
  bot.setGetStartedButton((payload, chat) => {
    chat.getUserProfile().then(async ({ first_name }) => {
      await chat.say(`Salut ${first_name} 👋`);
      await chat.say('Pour chercher un joueur, rien de plus simple, envoi le mot clè "recherche" suivit de l\'identifiant d\'un joueur 📊');
    });
  });
};
