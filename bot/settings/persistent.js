const { POST_HELP } = require('../payload');

const persistent = [
  {
    locale: 'default',
    composer_input_disabled: false,
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
  {
    locale: 'en_US',
    composer_input_disabled: false,
    call_to_actions: [
      {
        type: 'postback',
        title: 'How it\'s works ?',
        payload: POST_HELP,
      },
      {
        type: 'web_url',
        title: 'Facebook group link',
        url: 'https://BLALLALBLABLALLBLL.fr',
        webview_height_ratio: 'full',
      },
      {
        type: 'web_url',
        title: 'Developer link',
        url: 'https://twitter.com/JonGiamp',
        webview_height_ratio: 'full',
      },
    ],
  },
];

module.exports = (bot) => {
  bot.setPersistentMenu(persistent);
};
