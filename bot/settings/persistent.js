// const { POST_HELP } = require('../payload');

const persistent = [
  {
    locale: 'default',
    composer_input_disabled: false,
    call_to_actions: [
      {
        title: '🆘 Comment ça marche ?',
        type: 'postback',
        payload: 'POST_HELP',
      },
      {
        title: '➡️ Lien externes',
        type: 'nested',
        call_to_actions: [
          {
            type: 'web_url',
            title: '♥️ Lien Github du développeur',
            url: 'https://github.com/JonGiamp',
            webview_height_ratio: 'full',
          },
          {
            type: 'web_url',
            title: '💙 Lien Twitter du développeur',
            url: 'https://twitter.com/JonGiamp',
            webview_height_ratio: 'full',
          },
        ],
      },
    ],
  },
  {
    locale: 'en_US',
    composer_input_disabled: false,
    call_to_actions: [
      {
        type: 'postback',
        title: '🆘 How it\'s works ?',
        payload: 'POST_HELP',
      },
      {
        title: '➡️ External links',
        type: 'nested',
        call_to_actions: [
          {
            type: 'web_url',
            title: '♥️ Github developer link',
            url: 'https://github.com/JonGiamp',
            webview_height_ratio: 'full',
          },
          {
            type: 'web_url',
            title: '💙 Twitter developer link',
            url: 'https://twitter.com/JonGiamp',
            webview_height_ratio: 'full',
          },
        ],
      },
    ],
  },
];

module.exports = (bot) => {
  bot.setPersistentMenu(persistent);
};
