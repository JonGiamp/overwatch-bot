/* eslint camelcase: OFF */
const { POST_HELP } = require('../payload');

const input = [/^help[ -]?(me)?$/i, /^so+s$/i, /^aidez[ -]?moi$/i];
const sendHelp = (chat) => {
  chat.say('Rien de plus simple, envoi juste "recherche" suivit de l\'identifiant d\'un joueur et moi je fais le taff 😎');
};

module.exports = (bot) => {
  bot.hear(input, (payload, chat) => {
    sendHelp(chat);
  });

  bot.on(`postback:${POST_HELP}`, (payload, chat) => {
    sendHelp(chat);
  });
};
