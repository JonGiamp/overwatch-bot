const input = [/^h(i|e(y|llo))/i, /^bon(jour|soir)/i, /^yo+/i, /^sa+lu+t/i, /^goo+d(-| )+(mo+rning|afternon|evening)/i, /^wesh/i];
const gifs = [
  '3ca6f94a8d28d295f2e2d932a4c1b124',
  '4d96d6738a5ed224b6c07813fb284db6',
  '50c70a4b05a5464bc0e6febe34c0cb20',
  '68545daae02dda2e7d65117129bbeb94',
  '4a8a835e2d4c7eea6824e5800c4d7699',
  'ad0d2fab97762e5c086cf860130ff765',
  'c06ae36d2745023922c87cb47a82925a',
  '855016dd0a0b2ab7691a0ab89cf7efd2',
  'aeab7f6d058c3b3ceca811534643962c',
  '0d83c09583a49372abca938976e9bcf3',
  '61028f46ddc78c8c8fdece187cd613c8',
];

const getRandGif = array => array[Math.floor(Math.random() * array.length)];

module.exports = (bot) => {
  bot.hear(input, (payload, chat) => {
    chat.say({
      attachment: 'image',
      url: `https://media.tenor.co/images/${getRandGif(gifs)}/tenor.gif`,
    });
  });
};
