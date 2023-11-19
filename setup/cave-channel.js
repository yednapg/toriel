const axios = require('axios')
const { transcript } = require('../util/transcript')
const { client } = require('../app')
const { metrics } = require('../util/metrics')

async function setupCaveChannel() {
  await postMessage()
}



async function postMessage() {
  metrics.increment('events.cavestart', 1)
  client.chat.postMessage({
    channel: transcript('channels.toriel-playground'),
    text: transcript('slack-intro'),
    icon_url: transcript('avatar.log'),
    blocks: [
      transcript('block.text', { text: transcript('slack-intro') }),
      transcript('block.single-button', {
        text: 'Start!',
        value: 'flow_start',
      }),
    ],
  })
}

async function postAudio() {
  const file = await axios({
    method: 'get',
    url: transcript('files.cave-audio'),
    responseType: 'stream',
  })
  console.log({ channel: transcript('channels.arv') })
  const response = await client.files.upload({
    channels: transcript('channels.arv'),
    file: file.data,
    filename: 'play me',
    filetype: 'm4a',
  })
}

module.exports = { setupCaveChannel }
