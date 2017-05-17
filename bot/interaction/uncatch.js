module.exports = (bot) => {
  bot.on('message', async (payload, chat, data) => {
    if (!data.captured) {
      await chat.say('Je n\'ai pas compris ton message... 😞😞');
      await chat.say('Peut-être as-tu oublié le mot clé "rechercher" avant le joueur ? ☝️');
    }
  });
};
