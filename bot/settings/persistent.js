const { POST_HELP } = require('../payload');

const persistent = [
  {
    locale: 'default',
    composer_input_disabled: true,
    call_to_actions: [
      {
        type: 'postback',
        title: 'Comment ça marche ?',
        payload: POST_HELP,
      },
      {
        type: 'web_url',
        title: 'Lien du groupe Facebook',
        url: 'https://BLALLALBLABLALLBLL.fr',
        webview_height_ratio: 'full',
      },
      {
        type: 'web_url',
        title: 'Lien du développeur',
        url: 'https://twitter.com/JonGiamp',
        webview_height_ratio: 'full',
      },
    ],
  },
];

module.exports = (bot) => {
  bot.setPersistentMenu(persistent);
};
