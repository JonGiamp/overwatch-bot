const platforms = ['pc', 'psn', 'xbl'];
const regions = ['us', 'eu', 'kr', 'cn'];

module.exports = {
  platform: {
    text: 'Sur quelle plate-forme je dois chercher ?',
    quickReplies: platforms,
  },
  region: {
    text: 'Sur quelle region je dois chercher ?',
    quickReplies: regions,
  },
};
