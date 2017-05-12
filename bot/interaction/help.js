/* eslint camelcase: OFF */
const { POST_HELP } = require('../payload');

const input = [/^help[ -]?(me)?$/i, /^so+s$/i, /^aidez[ -]?moi$/i];
const sendHelp = (chat) => {
  chat.getUserProfile().then(({ first_name }) => {
    chat.say(`Pas de panique ${first_name}, envoi moi juste "recherche" suivit de l'identifiant d'un joueur et moi je m'occupe du reste ! :)`);
  });
};

module.exports = (bot) => {
  bot.hear(input, (payload, chat) => {
    sendHelp(chat);
  });

  bot.on(`quick_reply:${POST_HELP}`, (payload, chat) => {
    sendHelp(chat);
  });
};
