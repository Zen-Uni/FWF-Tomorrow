/**
 * @description user api
 * @author Uni
 */

// import models and components
const router = require('koa-router')()
const { SECRET, dispatchToken } = require('../middleware/jwt')
const {
  User,
  Captcha
} = require('../db/index')



// import controller
const emailVerify = require('../controller/emailVerify')
const registerController = require('../controller/register')


// set root router
router.prefix('/api/user')


// email verify
router.post('/email', async (ctx, next) => {
  const { email } = ctx.request.body
  ctx.body = await emailVerify(email)
})


// user register api
router.post('/register', async (ctx, next) => {
  const { username, password, captcha, email } = ctx.request.body
  const payload = {
    username,
    password,
    captcha,
    email,
  }

  const res = await registerController(payload)
  const token = await dispatchToken(username)

  ctx.response.set('Bearer', token)
  ctx.body = res
})

// user login api
router.get('/login', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})


// empty user data api
router.get('/empty', async (ctx, next) => {
  await User.remove(err => {
    if (err)  console.log('remove user error:', err)
    else  console.log('remove success')
  })
})

router.get('/captchanull', async (ctx, next) => {
  await Captcha.remove(err => {
    if (err)  console.log('remove captcha error:', err)
    else  console.log('remove success')
  })
})

module.exports = router
