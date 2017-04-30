const TelegramBot = require('node-telegram-bot-api')

// replace the value below with the Telegram token you receive from @BotFather
const token = '234289843:AAG7QuWJj3A853HLKCuNAZX77lfTTmrN908'

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true })

const api = require('./api')

bot.on('inline_query', async (inline) => {
  if (!inline.query || !inline.query.trim()) {
    return
  }
  const list = await api.getImageList(inline.query.trim())

  const resultArr = generateResult(list)

  bot.answerInlineQuery(inline.id, resultArr)
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })

  // bot.sendMessage(inline.from.id, 'something wrong, try again.')
})

bot.on('message', (msg) => {
  const chatId = msg.chat.id
  bot.sendMessage(chatId, 'talk is cheap, dou(斗) me the tu(图)!')
})

function generateResult(arr) {
  let result = []
  result = arr.splic(0, 50)
  result.forEach((item) => {
    if (item.imageUrl.endsWith('.gif')) {
      dataItem = {
        type: 'gif',
        imageUrl: item.imageUrl,
        thumb_url: item.imageUrl
      }
    } else {
      dataItem = {
        type: 'photo',
        photo_url: item.imageUrl,
        thumb_url: item.imageUrl
      }
    }
  })
  return result
}
