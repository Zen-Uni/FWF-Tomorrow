/**
 * @description login business logic
 * @author Uni
 */

// import result model and data model
const { ErrorModel, SuccessModel } = require('../config/resultModel')
const { 
    User,
 } = require('../db/')
const { dispatchToken } = require('../middleware/jwt')


const checkUser = async ({email, password}) => {
    return new Promise((resolve, reject) => {
        const exist = User.find({
            email,
            password,
        })

        exist.exec((err, data) => {
            if (err) {
                console.log('check user exist error --- ', err)
                reject(err)
            } else {
                if (data.length) {
                    resolve(true)
                } else {
                    resolve(false)
                }
            }
        })
    })
}


const loginController = async (payload) => {

    const res = await checkUser(payload)

    if (res) {
        const token = await dispatchToken(payload.email)
        return new SuccessModel({ token }, "登录成功！")
    } else {
        return new ErrorModel('用户邮箱或密码错误')
    }
}

module.exports = loginController