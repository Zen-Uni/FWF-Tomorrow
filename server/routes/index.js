const router = require('koa-router')()
const {User} = require('../db')

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })

  // User.remove({}, err => {
  //   console.log(err)
  //   console.log('remove success')
  // })

  const user = new User({
    name: 'Uni'
  })

  user.save(err => {
    console.log(err)
    console.log('save success')
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
