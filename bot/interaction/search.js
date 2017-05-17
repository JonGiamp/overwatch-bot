const fetch = require('node-fetch');
const quickReplies = require('../quickReplies');

// model: keywords pc|xbl|psn
const instruction = /^(\s*)((re)?chercher*|search|find)(\s*)(([^ ]{3,12})#\d{4,5}(\s*)|[a-zA-Z0-9 ]{1,15}|[a-zA-Z0-9_-]{3,16})(\s*)$/i;

module.exports = (bot) => {
  bot.hear(instruction, (payload, chat) => {
    const sendError = (message) => {
      if (message === 'Not Found') {
        chat.say('Je ne trouve pas ce joueur, as-tu bien renseigné son identifiant ?');
        chat.say('Si tu cherche un joueur PC, n\'oublie pas de renseigner son battletag ! Ex: pseudo#12345');
      } else {
        chat.say('Je suis désolé, une erreur interne est arrivé :(');
      }
    };

    const fetchData = async (pseudo, platform, region) => {
      try {
        const res = await fetch(`https://ow-api.herokuapp.com/profile/${platform}/${region}/${pseudo}`);
        if (res.statusText === 'OK') return res.json();
        throw new Error(res.statusText);
      } catch (e) {
        throw e;
      }
    };

    const generateModel = (convo, data) => {
      const username = data.username;
      const { rank, rank_img } = data.competitive;
      const { wins, played } = data.games.competitive;
      const platform = convo.get('platform');
      const region = convo.get('region');
      const pseudo = convo.get('pseudo');
      const url = `https://masteroverwatch.com/profile/${platform}/${region}/${pseudo}`;
      return [
        {
          title: username,
          image_url: rank_img,
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
      const pseudo = convo.get('pseudo');
      const platform = convo.get('platform');
      const region = convo.get('region');
      try {
        const data = await fetchData(pseudo, platform, region);
        const model = generateModel(convo, data);
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

    const askPlatform = (convo) => {
      convo.ask(quickReplies.platform, (pay, conv) => {
        const platform = pay.message.text.toLowerCase();
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
