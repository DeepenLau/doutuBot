const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()
const router = new Router()

const api = require('./api')
// const bot = require('./bot')

router
  .get('/:keyword', async (ctx, next) => {
    const keyword = ctx.params.keyword
    if (!keyword) {
      ctx.body = '你没有输入参数'
      next()
      return
    }
    let list = await api.getImageList(keyword)
    ctx.body = list
  })

app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(3000)