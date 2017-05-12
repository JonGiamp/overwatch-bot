/* eslint camelcase: OFF */
const { POST_HELP } = require('../payload');

const input = [/^help[ -]?(me)?$/i, /^so+s$/i, /^aidez[ -]?moi$/i, POST_HELP];

module.exports = (bot) => {
  bot.hear(input, (payload, chat) => {
    chat.getUserProfile().then(({ first_name }) => {
      chat.say(`Pas de panique ${first_name}, envoi moi juste mot clé recherche suivit de l'identifiant d'un joueur et moi je m'occupe du reste ! :)`);
    });
  });
};
