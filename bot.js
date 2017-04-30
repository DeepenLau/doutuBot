const TelegramBot = require('node-telegram-bot-api')

// replace the value below with the Telegram token you receive from @BotFather
const token = '234289843:AAG7QuWJj3A853HLKCuNAZX77lfTTmrN908'

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true})
// 普通应答
bot.on('text', (msg) => {
  const chatId = msg.chat.id
  bot.sendMessage(chatId, "I'm alive! And get " + msg.text)
})

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Received your message');
});

