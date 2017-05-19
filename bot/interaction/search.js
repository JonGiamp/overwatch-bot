const fetch = require('node-fetch');
const quickReplies = require('../quickReplies');

// model: keywords pc|xbl|psn
const instruction = /^(\s*)((re)?chercher*|search|find)(\s*)(([^ ]{3,12})#\d{4,5}(\s*)|[a-zA-Z0-9 ]{1,15}|[a-zA-Z0-9_-]{3,16})(\s*)$/i;
const divisions = ['Bronze 🎈', 'Silver 🔩', 'Gold 🏆', 'Platinum 🔮', 'Diamond 💎', 'Master 👑', 'Grandmaster 👑'];

const getDivision = (url) => {
  const match = /rank-\d/.exec(url);
  const number = /\d/.exec(match[0]);
  const id = parseInt(number, 10) - 1;
  return divisions[id];
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
  const { username, portrait: image_url } = data;
  const { rank, rank_img } = data.competitive;
  const { wins, played } = data.games.competitive;
  const url = `https://masteroverwatch.com/profile/${platform}/${region}/${pseudo}`;
  const title = region === 'global' ?
    `${username} sur ${platform.toUpperCase()}` :
    `${username} sur ${platform.toUpperCase()} en région ${region.toUpperCase()}`;
  const division = getDivision(rank_img);
  return [
    {
      title,
      image_url,
      subtitle: `Classement: ${rank} en ${division}\r\n${played} parties jouées - ${wins} victoires`,
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

const formatPlatform = text => text.replace('💻 ', '').replace('🎮 ', '').toLowerCase();

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

    const sendStats = async (convo) => {
      chat.say('Ok, quelques petites secondes et je te trouve ça 😎👌');
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
        if (pay.message.text === '🔙 Annuler' || pay.message.text === '🔙 Cancel') conv.end();
        else {
          const region = pay.message.text.toLowerCase();
          conv.set('region', region);
          sendStats(conv);
        }
      });
    };

    const askPlatform = (convo) => {
      convo.ask(quickReplies.platform, (pay, conv) => {
        if (pay.message.text === '🔙 Annuler' || pay.message.text === '🔙 Cancel') conv.end();
        else {
          const platform = formatPlatform(pay.message.text);
          conv.set('platform', platform);
          if (platform === 'pc') askRegion(conv);
          else {
            conv.set('region', 'global');
            sendStats(conv);
          }
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
