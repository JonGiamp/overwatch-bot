const output = require('./output');

module.exports = bot => bot.on('postback:POST_HELP', (payload, chat) => chat.say(output));
