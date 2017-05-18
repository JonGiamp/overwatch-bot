const platforms = [
  {
    content_type: 'text',
    title: '🎮 PSN',
  },
  {
    content_type: 'text',
    title: '💻 PC',
  },
  {
    content_type: 'text',
    title: '🎮 XBL',
  },
  {
    content_type: 'text',
    title: '🔙 Annuler',
  },
];
const regions = [
  {
    content_type: 'text',
    title: 'US',
    image_url: 'https://static.xx.fbcdn.net/images/emoji.php/v8/zcd/1/32/1f1fa_1f1f8.png',
  },
  {
    content_type: 'text',
    title: 'EU',
    image_url: 'https://www.facebook.com/images/emoji.php/v8/ffe/1/28/1f1ea_1f1fa.png',
  },
  {
    content_type: 'text',
    title: 'KR',
    image_url: 'https://static.xx.fbcdn.net/images/emoji.php/v8/z5b/1/32/1f1f0_1f1f7.png',
  },
  {
    content_type: 'text',
    title: 'CN',
    image_url: 'https://static.xx.fbcdn.net/images/emoji.php/v8/z0/1/32/1f1e8_1f1f3.png',
  },
  {
    content_type: 'text',
    title: '🔙 Cancel',
  },
];

module.exports = {
  platform: {
    text: 'Sur quelle plate-forme je dois chercher ? 🔬',
    quickReplies: platforms,
  },
  region: {
    text: 'Sur quelle region je dois chercher ? 🌍',
    quickReplies: regions,
  },
};
