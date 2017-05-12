const greeting = [
  {
    locale: 'default',
    text: "Salut {{user_first_name}}, moi cest BotOW ! Je suis là pour te donner des stats sur les joueurs d'Overwatch.",
  },
  {
    locale: 'en_US',
    text: "Hey {{user_first_name}}, I'm BotOW ! I'm here to provide you statistics of Overwatch players.",
  },
];

module.exports = (bot) => {
  bot.setGreetingText(greeting);
};
