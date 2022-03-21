const { transcript } = require("../util/transcript")

async function ensureChannels(args) {
  const { client } = args
  const data = await client.users.conversations()
  const currentChannelIDs = data.channels.map(c => c.id)
  const testChannelIDs = [
    transcript('channels.the-basement'),
    transcript('channels.bot-spam'),
  ]

  let missingChannels = []
  testChannelIDs.forEach(testID => {
    let found = currentChannelIDs.indexOf(testID) > -1
    if (!found) {
      missingChannels.push(testID)
    }
  })
  if (missingChannels.length === 0) {
    console.log('Toriel is in all channels she should have access to')
  } else {
    console.warn('⚠️Toriel is not invited to these channels:', missingChannels)
  }
}

module.exports = { ensureSlackChannels: ensureChannels }