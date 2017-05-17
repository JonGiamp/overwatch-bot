const greeting = [
  {
    locale: 'default',
    text: 'Salut {{user_first_name}} 😄 \r\n Envie d\'avoir des stats sur les joueurs d\'Overwatch ? 🔎',
  },
  {
    locale: 'en_US',
    text: 'Hey {{user_first_name}} 😄 \r\n Do you want to have the statistics of Overwatch players ? 🔎',
  },
];

module.exports = (bot) => {
  bot.setGreetingText(greeting);
};
