/* eslint camelcase: OFF */
module.exports = (bot) => {
  bot.setGetStartedButton(async (payload, chat) => {
    const { first_name } = await chat.getUserProfile();
    await chat.say(`Salut ${first_name} 👋`);
    await chat.say('Pour chercher un joueur, envoi le mot clè "recherche" suivit de l\'identifiant d\'un joueur 📊📈');
  });
};
