const fetch = require('node-fetch');

// model: keywords pc|xbl|psn
const instruction = /^(\s*)((re)?chercher*|search|find)(\s*)(([^ ]{3,12})#\d{4}(\s*)|[a-zA-Z0-9 ]{1,15}|[a-zA-Z0-9_-]{3,16})(\s*)$/;
const quickReplies = {
  platform: {
    text: 'Sur quelle plate-forme je dois chercher ?',
    quickReplies: ['pc', 'psn', 'xbl'],
  },
  region: {
    text: 'Sur quelle region je dois chercher ?',
    quickReplies: ['us', 'eu', 'kr', 'cn'],
  },
};

module.exports = (bot) => {
  bot.hear(instruction, (payload, chat) => {
    const fetchData = async (pseudo, platform, region) => {
      const res = await fetch(`https://ow-api.herokuapp.com/profile/${platform}/${region}/${pseudo}`);
      return res.json();
    };

    const generateModel = (convo, data) => {
      const username = data.username;
      const { rank, img } = data.competitive;
      const { wins, lost } = data.games.competitive;
      const ratio = wins / lost;
      const platform = convo.get('platform');
      const region = convo.get('platform');
      const pseudo = convo.get('platform');
      const url = `https://masteroverwatch.com/profile/${platform}/${region}/${pseudo}`;
      return [
        {
          title: username,
          image_url: img,
          subtitle: `Rank: ${rank}. Ratio: ${ratio}`,
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

    const getStats = async (convo) => {
      const pseudo = convo.get('pseudo');
      const platform = convo.get('platform');
      const region = convo.get('region');
      const data = await fetchData(pseudo, platform, region);
      const model = generateModel(data);
      await convo.sendGenericTemplate(model, { typing: true });
      convo.end();
    };

    const askRegion = (convo) => {
      convo.ask(quickReplies.region, (payload, convo) => {
        const region = payload.message.text;
        convo.set('platform', region);
        convo.sendTypingIndicator(1000).then(() => getStats(convo));
      });
    };

    const askPlatform = (convo) => {
      convo.ask(quickReplies.platform, (payload, convo) => {
        const platform = payload.message.text;
        convo.set('platform', platform);
        convo.sendTypingIndicator(1000).then(() => {
          if (platform === 'pc') { return askRegion(convo); }
          convo.set('region', 'global');
          return getStats(convo);
        });
      });
    };

    chat.conversation((convo) => {
      const data = payload.message.text.replace(/^(\s*)((re)?chercher*|search|find)(\s*)/, '');
      const isPSN = /^(([^ ]{3,12})#\d{4}(\s*))(\s*)$/.test(data);
      const pseudo = isPSN ? data.replace('#', '-') : data;
      convo.set('pseudo', pseudo);
      convo.sendTypingIndicator(1000).then(() => askPlatform(convo));
    });
  });
};
