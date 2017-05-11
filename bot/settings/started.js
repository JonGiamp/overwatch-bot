const { POST_STARTED } = require('../payload');

module.exports = (bot) => {
  bot.setGetStartedButton(POST_STARTED);
};
