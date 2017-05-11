// model: keywords pc|xbl|psn
const instruction = /^(\s*)((re)?chercher*|search|find)(\s*)(([^ ]{3,12})#\d{4}(\s*)|[a-zA-Z0-9 ]{1,15}|[a-zA-Z0-9_-]{3,16})(\s*)$/;

module.exports = bot => {
  bot.hear(instruction, (payload, chat) => {
    const platform = {
      q: {
        text: `Sur quelle plate-forme je dois chercher ?`,
        quickReplies: ['pc', 'psn', 'xbl']
      },
      a: (payload, convo) => {
        const answer = (answer === 'PC') ? payload.message.text.replace('#','-') : payload.message.text;
        convo.set('platfom',answer);
        if(answer === 'PC')
          return askRegion(convo);
        convo.set('region','global');
        return getData(convo);
      }
    };
    const region = {
      q: {
        text: `Sur quelle region je dois chercher ?`,
        quickReplies: ['us', 'eu', 'kr', 'cn']
      },
      a: (payload, convo) => {
        const answer = payload.message.text;
        convo.set('region',answer);
        getData(convo);
      }
    };

    const genericModel = (data, convo) => {
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
          "title": username,
          "image_url": img,
          "subtitle": `Rank: ${rank}. Ratio: ${ratio}`,
          "buttons":[
            {
              "type":"web_url",
              "url":url,
              "title":"Visiter son profil"
            }
          ]
        }
      ]
    };
    const getData = convo => {
      const pseudo = convo.get("pseudo");
      const platform = convo.get("platform");
      const region = convo.get("region");
      fetchData(pseudo, platform, region)
        .then( data => sendData(convo, data))
    }
    const fetchData = async (pseudo, platform, region) => {
      const res = await fetch(`https://ow-api.herokuapp.com/profile/${platform}/${region}/${pseudo}`);
      const data = await res.json();
      return data;
    }

    chat.conversation( convo => {
      convo.set('pseudo', payload.message.text.replace(/^(\s*)((re)?chercher*|search|find)(\s*)/, ''));
      askPlatform(convo):
    });

    const askPlatform = convo => convo.ask(platform.q, platform.a, [], { typing: true });
    const askRegion = convo => convo.ask(region.q, region.a, [], { typing: true };
    const sendData = (convo, data) => {
      const elements = genericModel(data, convo);
      convo.sendGenericTemplate(elements, { typing: true })
        .then( () => convo.end() );
    };
  });
};
