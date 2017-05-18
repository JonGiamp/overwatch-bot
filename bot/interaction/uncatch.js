const notifyUser = async (chat) => {
  await chat.say('Je n\'ai pas compris ton message... 😞😞');
  await chat.say('Peut-être as-tu oublié le mot clé "rechercher" avant le joueur ? ☝️');
};

module.exports = (bot) => {
  bot.on('message', (payload, chat, data) => {
    if (!data.captured) notifyUser(chat);
  });

  bot.on('attachment', (payload, chat, data) => {
    if (!data.captured) notifyUser(chat);
  });
};
