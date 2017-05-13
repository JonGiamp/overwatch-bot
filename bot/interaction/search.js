const fetch = require('node-fetch');
const quickReplies = require('../quickReplies');

// model: keywords pc|xbl|psn
const instruction = /^(\s*)((re)?chercher*|search|find)(\s*)(([^ ]{3,12})#\d{4,5}(\s*)|[a-zA-Z0-9 ]{1,15}|[a-zA-Z0-9_-]{3,16})(\s*)$/i;

module.exports = (bot) => {
  bot.hear(instruction, (payload, chat) => {
    const fetchData = async (pseudo, platform, region) => {
      try {
        const res = await fetch(`https://ow-api.herokuapp.com/profile/${platform}/${region}/${pseudo}`);
        const data = res.json();
        return data;
      } catch (e) {
        return e;
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
        console.log(`Fetch response : ${data}`);
        const model = generateModel(convo, data);
        await convo.sendGenericTemplate(model, { typing: true });
      } catch (e) {
        console.log(`Fetch error : ${e}`);
      }
      convo.end();
    };

    const askRegion = (convo) => {
      convo.ask(quickReplies.region, (payload, convo, data) => {
        const region = payload.message.text;
        console.log(`Region selectionné : ${region}`);
        convo.set('platform', region);
        convo.sendTypingIndicator(1000).then(() => sendStats(convo));
      });
    };

    const askPlatform = (convo) => {
      convo.ask(quickReplies.platform, (payload, convo, data) => {
        const platform = payload.message.text;
        console.log(`Plateforme selectionné : ${platform}`);
        convo.set('platform', platform);
        convo.sendTypingIndicator(1000).then(() => {
          if (platform === 'PC') {
            askRegion(convo);
          } else {
            convo.set('region', 'global');
            sendStats(convo);
          }
        });
      });
    };

    chat.conversation((convo) => {
      const data = payload.message.text.replace(/^(\s*)((re)?chercher*|search|find)(\s*)/i, '');
      const isPSN = /^(([^ ]{3,12})#\d{4,5}(\s*))(\s*)$/i.test(data);
      const pseudo = isPSN ? data.replace('#', '-') : data;
      console.log(`Pseudo selectionné : ${pseudo}`);
      convo.set('pseudo', pseudo);
      convo.sendTypingIndicator(1000).then(() => askPlatform(convo));
    });
  });
};
