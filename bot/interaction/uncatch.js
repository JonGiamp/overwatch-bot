const output = 'Je n\'ai pas compris ton message, n\'oublie pas d\'utiliser le mot clé "rechercher" pour chercher un joueur ! :)';

module.exports = (bot) => {
  bot.on('message', (payload, chat, data) => {
    if (!data.captured) chat.say(output);
  });
};
