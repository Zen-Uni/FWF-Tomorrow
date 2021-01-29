/**
 * @description user api
 * @author Uni
 */

// import models and components
const router = require('koa-router')()
const {
  User,
  Captcha
} = require('../db/index')


// import middleware
const emailVerify = require('../middleware/emailVerify')

// set root router
router.prefix('/api/user')


// email verify
router.post('/email', async (ctx, next) => {
  const { email } = ctx.request.body
  ctx.body = await emailVerify(email)
})


// user register api
router.post('/register', async (ctx, next) => {

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
