const { client } = require('../app')
const { transcript } = require('../util/transcript')
const { metrics } = require('../util/metrics')

async function startup() {
  console.log("hello")
  metrics.increment('events.startup', 1);
  await client.chat.postMessage({
     text: transcript('startup.message'),
     channel: transcript('channels.bot-spam'),
     username: 'TUTORIEL',
     icon_url: transcript('startup.avatar'),
     unfurl_links: false,
     unfurl_media: false,
   })
}

module.exports = { startupInteraction: startup }
