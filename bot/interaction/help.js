/* eslint camelcase: OFF */
const { POST_HELP } = require('../payload');

const input = [/^help[ -]?(me)?$/i, /^so+s$/i, /^aidez[ -]?moi$/i];
const sendHelp = (chat) => {
  chat.getUserProfile().then(({ first_name }) => {
    chat.say(`Rien de plus simple ${first_name}, envoi juste "recherche" suivit de l'identifiant d'un joueur et moi je fais le taff 😎`);
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
