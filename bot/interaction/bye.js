const input = [/^bye/i, /^bonne(-| )+soirée/i, /^goo+d(-| )+bye/i];
// const output = ['A bientôt', 'Bye'];

// const getRandAnswer = array => array[Math.floor(Math.random() * array.length)];

module.exports = (bot) => {
  bot.hear(input, (payload, chat) => {
    // chat.getUserProfile().then((user) => {
    //   const bye = getRandAnswer(output);
    //   chat.say(`${bye} ${user.first_name} 😘`);
    // });
    chat.say({
      attachment: 'image',
      url: 'https://media.tenor.co/images/4d1267fbacc61e55a0f82c44ba16ec00/tenor.gif',
    });
  });
};
