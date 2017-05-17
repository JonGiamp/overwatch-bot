const fetch = require('node-fetch');
const quickReplies = require('../quickReplies');

// model: keywords pc|xbl|psn
const instruction = /^(\s*)((re)?chercher*|search|find)(\s*)(([^ ]{3,12})#\d{4,5}(\s*)|[a-zA-Z0-9 ]{1,15}|[a-zA-Z0-9_-]{3,16})(\s*)$/i;

module.exports = (bot) => {
  bot.hear(instruction, (payload, chat) => {
    const sendError = async (message) => {
      if (message === 'Not Found') {
        await chat.say('Désolé, le joueur est introuvable 😮');
        await chat.say('Si c\'est un joueur PC, n\'oublie pas de mettre son battletag en entier ! Ex: pseudo#12345');
      } else {
        await chat.say('Je suis désolé, une erreur interne est arrivé 😣😣');
      }
    };

    const fetchData = async ({ pseudo, platform, region }) => {
      try {
        const res = await fetch(`https://api-overwatch.herokuapp.com/profile/${platform}/${region}/${pseudo}`);
        if (res.statusText === 'OK') return res.json();
        throw new Error(res.statusText);
      } catch (e) {
        throw e;
      }
    };

    const generateModel = ({ pseudo, platform, region }, data) => {
      const { username, portrait } = data;
      const { rank } = data.competitive;
      const { wins, played } = data.games.competitive;
      const url = `https://masteroverwatch.com/profile/${platform}/${region}/${pseudo}`;
      return [
        {
          title: username,
          image_url: portrait,
          subtitle: `Classement: ${rank}. ${played} parties en ranked - ${wins} victoires`,
          buttons: [
            {
              type: 'web_url',
              url,
              title: 'Visiter son profil',
            },
          ],
        },
      ];
    };

    const sendStats = async (convo) => {
      try {
        const data = await fetchData(convo.context);
        const model = generateModel(convo.context, data);
        await convo.sendGenericTemplate(model, { typing: true });
      } catch (e) {
        sendError(e.message);
      }
      convo.end();
    };

    const askRegion = (convo) => {
      convo.ask(quickReplies.region, (pay, conv) => {
        const region = pay.message.text.toLowerCase();
        conv.set('region', region);
        sendStats(conv);
      });
    };

    const formatPlatform = text => text.replace('💻 ', '').replace('🎮 ', '').toLowerCase();

    const askPlatform = (convo) => {
      convo.ask(quickReplies.platform, (pay, conv) => {
        const platform = formatPlatform(pay.message.text);
        conv.set('platform', platform);
        if (platform === 'pc') {
          askRegion(conv);
        } else {
          conv.set('region', 'global');
          sendStats(conv);
        }
      });
    };

    chat.conversation((convo) => {
      const data = payload.message.text.replace(/^(\s*)((re)?chercher*|search|find)(\s*)/i, '');
      const isPSN = /^(([^ ]{3,12})#\d{4,5}(\s*))(\s*)$/i.test(data);
      const pseudo = isPSN ? data.replace('#', '-') : data;
      convo.set('pseudo', pseudo);
      askPlatform(convo);
    });
  });
};
