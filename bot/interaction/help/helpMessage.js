const input = [/^help[ -]?(me)?$/i, /^so+s$/i, /^aidez[ -]?moi$/i];
const output = require('./output');

module.exports = (bot) => {
  bot.hear(input, (payload, chat) => chat.say(output));
};
