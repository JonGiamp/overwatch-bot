module.exports = (bot) => {
  bot.on('message', (payload, chat, data) => {
    console.log(data);
    console.log(data.captured);
    console.log(data.captured.flag);
  });
};
