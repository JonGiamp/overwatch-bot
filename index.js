const Bootbot = require('bootbot');

const bot = new Bootbot({
  accessToken: 'EAADCcjfaZADsBAPeKeAvDUUoZCH3npFo4ZBFkgDt1J5ZBBX8JvTHnPDIy2JZCSwrDboPkI6qTfyyQt5aI0XIfTbhqAuLv81ZCCG33Vra5NFpnI3Dcpajl8gaCEiFLXtAoi7aV7Vb2FiMWO2PeLqlhqrjdnEqwsK9bNiXeJgRpvkwZDZD',
  verifyToken: 'TEST_BOT_TOKEN',
  appSecret: '46c8e6f38c923e241bc040d1a40b6e24'
});

bot.on('message', (payload, chat) => {
  const text = payload.message.text;
  console.log(`The user said ${text}`);
});

bot.hear(['hello','bonjour','hi','hey', /hey( there)?/i], (payload, chat) => {
  console.log(`The user said hello, bonour, hi, hey or hey there !`);
  chat.say('Hello human !').then( () => {
    chat.say('How are you today ?', { typing: true });
  });
});

bot.hear(['food','hungry'], (payload, chat) => {
  chat.say({
    text: 'What do you need help with ?',
    buttons: [
      { type: 'postback', title: 'Settings', payload: 'HELP_SETTINGS' },
      { type: 'postback', title: 'FAQ', payload: 'HELP_FAQ' },
      { type: 'postback', title: 'Talk to a human', payload: 'HELP_HUMAN' },
    ]
  });
});

bot.hear('image', (payload, chat) => {
  chat.say({
    attachment: 'image',
    url: 'http://fakeimg.pl/250x100/ff0000/'
  });
});

bot.hear('ask me something', (payload, chat) => {
  chat.conversation( convo => askName(convo) );

  const askName = convo => {
    convo.ask(`What's your name ?`, (payload, convo) => {
      const text = payload.message.text;
      convo.set('name', text);
      convo.say(`Oh ! Your name is ${text}`).then( () => askFavoriteFood(convo) );
    });
  }

  const askFavoriteFood = convo => {
    convo.ask(`What's your favorite food ?`, (payload, convo) => {
      const text = payload.message.text;
      convo.set('food', text);
      convo.say(`I'm agree, ${text} is very good !`).then( () => sendSummary(convo) );
    });
  };

  const sendSummary = convo => {
    convo.say(`Ok, here's what yout told me about you
      - Name: ${convo.get('name')}
      - Food: ${convo.get('food')}`);
    convo.end();
  };
});

bot.start(process.env.PORT || 1415);
