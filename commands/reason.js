const { prisma } = require('../db')
const { transcript } = require('../util/transcript')
const { joinSlackInteraction } = require('../interactions/join-slack-channel')

async function reason(args) {
  console.log("reason")
  const { payload, client, respond, command} = args;
  const { user_id, text} = payload;


  let usertoGet = user_id

  const userRegex = /<@([A-Za-z0-9]+)\|.+>/i
  const userMatches = text.match(userRegex)
  const foundUser = userMatches ? userMatches[0] : null
  if (foundUser && foundUser != '') {
    const callingUser = await client.users.info({
      user: user_id,
    })
    console.log(userMatches)


    if (callingUser.user.is_admin || callingUser.user.is_owner) {
      usertoGet = foundUser


      respond({
        text: `finding reason for <@${usertoGet}>`,
      })
    } else {
      // no permissions– skip
      respond({
        text: 'Only admins, oweners of the accout & people in #welcome-commiette can run this command',
      })
      return null
    }
  } else {
    respond({
      text: `${command.text}`
    })
  }

  const joinArgs = args
  joinArgs.payload.channel = transcript('channels.arv')
  joinArgs.payload.user = usertoGet

  const findReason = await prisma.invite.findFirst({
    where: {
    user_id: joinArgs.payload.user,
    },
    select: {
      welcome_message: true
    }
  })

  let reason = JSON.stringify(findReason)
  reason = reason.split(" ")


  await client.chat.postMessage({
    text: `${reason}`,
    channel: usertoGet,
    // icon_url: transcript('startup.avatar')
  })





}
module.exports = reason
