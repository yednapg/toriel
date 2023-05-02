const { prisma } = require('../db')
const { transcript } = require('../util/transcript')
const { client } = require('../app')

async function postWelcomeCommittee(user) {
  try {
    const slackuser = await client.users.info({ user })
    const email = slackuser?.user?.profile?.email
    const invite = await prisma.invite.findFirst({
      where: { email },
      orderBy: { createdAt: 'desc' },
    })
    const message =
      invite?.['welcome_message'] || "I'm using the /toriel-restart command"
    const continent = invite?.['continent'] || 'DEFAULT_CONTINENT'
    const hs = invite ? invite.high_school : true
    await client.chat.postMessage({
      channel: transcript('channels.arv-tor'),
      text: transcript('welcome-committee', {
        user,
        message,
        continent,
        hs,
      }),
    })
  } catch (e) {
    console.log(e)
  }
}

module.exports = { postWelcomeCommittee }
