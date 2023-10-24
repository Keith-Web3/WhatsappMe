const express = require('express')
const app = express()

const port = 3001

const { Client, LocalAuth } = require('whatsapp-web.js')

app.listen(port, () => {
  console.log(`Server listening on port::${port}`)
})

import('./createReply.js')
  .then(module => {
    // Module is available here
    const replyMessage = module.replyMessage

    const allSessionsObject = {}
    const client = new Client({
      puppeteer: {
        headless: false,
        args: ['--no-sandbox', '--disable-dev-shm-usage'],
      },
      authStrategy: new LocalAuth({
        clientId: 'YOUR_CLIENT_ID',
      }),
    })

    client.on('qr', qr => {
      console.log('generated qr code', qr)
    })

    client.on('ready', () => {
      console.log('Client is ready!')
    })

    client.on('message', async message => {
      if (message.hasMedia || message.isStatus) return

      const chat = await message.getChat()
      if (chat.isGroup) return

      let latestMessages = await chat.fetchMessages({ limit: 5 })
      latestMessages = latestMessages
        .map(message => {
          if (message.fromMe) {
            return `AI: ${message.body}`
          }
          return `Human: ${message.body}`
        })
        .join('\n')
      const reply = await replyMessage(message.body, latestMessages)

      if (reply.trim().length === 0) return

      message.reply(reply)
    })

    client.initialize()
  })
  .catch(error => {
    // Handle any import errors
    console.log('An error occurred loading the module', error)
  })
