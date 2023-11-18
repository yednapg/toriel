const { transcript } = require('../transcript')
const onboardInvite = {
  channels: [transcript('channels.onboard'), transcript('channels.arv')],
  customMessage: 'Welcome onboard!',
}

module.exports = { onboardInvite }


