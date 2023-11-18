const { transcript } = require('../transcript')

const defaultInvite = {
  channels: [transcript('channels.arv')],
  customMessage: 'While wandering through a forest, you stumble upon a cave...',
}

module.exports = { defaultInvite }
