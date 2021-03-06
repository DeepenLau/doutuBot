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
  // console.log(resultArr)
  bot.answerInlineQuery(inline.id, resultArr)
    .then(res => {
      // console.log(res)
    })
    .catch(err => {
      console.log(err)
    })

  // bot.sendMessage(inline.from.id, 'something wrong, try again.')
})

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id
  const resp = match[1] // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp)
});

bot.on('message', (msg) => {
  const chatId = msg.chat.id
  bot.sendMessage(chatId, 'talk is cheap, dou(斗) me the tu(图)!')
})

function generateResult(arr) {
  let result = []
  arr = arr.splice(0, 50)
  arr.forEach((item, index) => {
    let dataItem = {}
    if (item.imageUrl.endsWith('.gif')) {
      // 先不搞 gif 了
      // dataItem = {
      //   type: 'gif',
      //   id: index.toString(),
      //   imageUrl: 'https:' + item.imageUrl,
      //   thumb_url: 'https:' + item.imageUrl
      // }
    } else {
      dataItem = {
        type: 'photo',
        id: index.toString(),
        photo_url: 'https:' + item.imageUrl,
        thumb_url: 'https:' + item.imageUrl,
        photo_width: 200,
        photo_height: 200
      }
      result.push(dataItem)
    }
  })
  return result
}
