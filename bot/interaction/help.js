const input = [/^help[ -]?(me)?$/i, /^so+s$/i, /^aidez[ -]?moi$/i];
const postback = 'postback:POST_HELP';
const output = 'Rien de plus simple, envoi juste "recherche" suivit de l\'identifiant d\'un joueur et moi je fais le taff 😎';

module.exports = (bot) => {
  bot.hear(input, (payload, chat) => chat.say(output));
  bot.on(postback, (payload, chat) => chat.say(output));
};
