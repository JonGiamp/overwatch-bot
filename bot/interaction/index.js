const hello = require('./hello');
const search = require('./search');
const { helpMessage, helpPostback } = require('./help');
const uncatch = require('./uncatch');
const bye = require('./bye');
const urWelcome = require('./urWelcome');
const howAreYou = require('./howAreYou');

module.exports = {
  hello,
  search,
  helpMessage,
  helpPostback,
  uncatch,
  bye,
  urWelcome,
  howAreYou,
};
