const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()
const router = new Router()

const getImageList = require('./getImage')
const bot = require('./bot')

router
  .get('/:keyword', async (ctx, next) => {
    const keyword = ctx.params.keyword
    // let list = await getImageList(keyword)
  })

app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(3000)

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Received your message');
})