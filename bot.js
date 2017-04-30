const TelegramBot = require('node-telegram-bot-api')

// replace the value below with the Telegram token you receive from @BotFather
const token = '234289843:AAG7QuWJj3A853HLKCuNAZX77lfTTmrN908'

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true})

const api = require('./api')

bot.on('inline_query', async (inline) => {
  if (!inline.query || !inline.query.trim()) {
    return
  }
  try {
    const list = await api.getImageList(inline.query.trim())
    console.log(list)
    console.log(list.length)

    const result = await bot.answerInlineQuery(inline.id, list)

    console.log(result)

  } catch (e) {
    bot.sendMessage(inline.from.id, 'something wrong, try again.')
  }
})

bot.on('message', (msg) => {
  const chatId = msg.chat.id
  bot.sendMessage(chatId, 'talk is cheap, dou(斗) me the tu(图)!')
})
