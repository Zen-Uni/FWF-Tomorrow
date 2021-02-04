/**
 * @description register business logic
 * @author Uni
 */

// import result model and data model
const { ErrorModel, SuccessModel } = require('../config/resultModel')
const { 
    User,
    Captcha,
 } = require('../db/')
const { dispatchToken } = require('../middleware/jwt')

/**
 * @description check the correctness of the verification code
 * @param {string} email 
 * @param {string} captcha 
 * @returns {boolean} true --- captcha exists, verify success  |  false --- captcha not exists, verify failed
 */
const checkCaptcha = async ({email, captcha}) => {

    return new Promise((resolve, reject) => {
        const exist = Captcha.find({
            email,
            captcha,
        })

        exist.exec((err, data) => {
            if (err) {
                console.log('check captcha error --- ', err)
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




/**
 * @description save user data, sign up success
 * @param {Object} payload 
 */
const saveUser = async ({email, password, username}) => {
    const user = new User({
        email, 
        password, 
        username,
    })

    return new Promise ((resolve, reject) => {
        user.save(err => {
            if (err) {
                console.log('save user error --- ', err)
                reject(err)
            } else {
                resolve(true)
            }
        })
    })
}

const registerController = async (payload) => {
  
    try {
        const captchaExist = await checkCaptcha(payload)
        if (captchaExist) {
            const res = await saveUser(payload)
            if (res) {
                const token = await dispatchToken(payload.email)
                console.log(token)
                return new SuccessModel({ token }, '注册成功！')
            }
        } else {
            return new ErrorModel('验证码错误！')
        }
    } catch (err) {
        console.log(err)
    }
}


module.exports = registerController