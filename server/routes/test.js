/**
 * @description use to check api and database model
 * @author Uni
 */

const router = require('koa-router')()
const { User } = require('../db')
const { SuccessModel, ErrorModel } = require('../config/resultModel')


// test functions
async function queryUser(username) {
    const exist = User.find({
        username
    })

    return new Promise((resolve, reject) => {
        exist.exec((err, data) => {
            if (err) {
                console.log('test error --- ', err)
                resolve(new ErrorModel('用户查询失败'))
            } else {
                if (data.length) {
                    resolve(new SuccessModel(data, '用户查询成功'))
                } else {
                    resolve(new SuccessModel('用户不存在'))
                }
            }
        })
    })
}

async function saveUser(username, email, password) {
    const user = new User({
        username,
        email,
        password
    })

    return new Promise((resolve, reject) => {
        user.save(err => {
            if (err) {
                console.log('test error --- ', err)
                resolve(new ErrorModel('用户存储失败'))
            }
    
            resolve(new SuccessModel('用户存储成功'))
    
        })
    })
}



router.prefix('/test')






// test mongoose model return value
router.post('/usermodel', async(ctx, next) => {
    const { username, email, password } = ctx.request.body

    let saveRes
    await saveUser(username, email, password).then(res => saveRes = res)

    console.log('save response ------ ', saveRes)
    if (saveRes.code === 1) {
        ctx.body = saveRes
    } else {
        let queryRes
        await queryUser(username).then(res => queryRes = res)
        ctx.body = queryRes
    }
})


module.exports = router

