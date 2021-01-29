/**
 * @description mail verify service
 * @author Uni
 */



// import mail service
const mailTransport = require('../config/emailConfig')



// import User model to verify email exist
const { User, Captcha } = require('../db')



// import result model
const { SuccessModel, ErrorModel } = require('../config/resultModel')

const createCaptcha = () => {
    let captcha = []
    for (let i = 0; i < 5; i++) {
        captcha.push(Math.floor(Math.random()*10))
    }
    const res = captcha.join("")
    console.log(captcha)
    return res
}

const createOptions = (email, captcha) => {
    const options = {
        from        : 'we_found_404@163.com',
        to          : email,
       
        subject        : 'Tomorrow 注册服务',
        text          : 'Tomorrow 用户注册邮箱验证码',
        html           : `<p>你好，这是一封来自 FWF工作室 的邮件！你的验证码是：</p><h1>${captcha}</h1>`, 
    }

    return options
}


// verify target email exists
const verifyEmail = async (email) => {
    return new Promise((resolve, reject) => {
        const exist = User.find({
            email
        })
        exist.exec((err, data) => {
            if (err) {
                console.log('verify email error --- ', err)
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

// save captcha
const saveCaptcha = async (email, captcha) => {
    return new Promise((resolve, reject) => {
        const exist = Captcha.find({
            email
        })
        exist.exec((err, data) => {
            if (err) {
                console.log('captcha exists error --- ', err)
                reject(err)
            } else {
                if (data.length) {
                    Captcha.update({
                        email
                    }, {$set: {
                        captcha
                    }}, err => {
                        if (err) {
                            console.log('update captcha error --- ', err)
                            reject(err)
                        }
                    })
                } else {
                    const setCaptch = new Captcha({
                        email,
                        captcha
                    })
                    setCaptch.save(err => {
                        if (err) {
                            console.log('save captcha error --- ', err)
                            reject(err)
                        } 
                    })
                }

                const options = createOptions(email, captcha)
                mailTransport.sendMail(options, err => {
                    if (err) {
                        console.log('transport email error --- ', err)
                        reject(err)
                    } else {
                        resolve(new SuccessModel('邮箱发送成功！'))
                    }
                })
            }
        })
    })
}

const emailVerify = async (email) => {
    try {
        const emailExist = await verifyEmail(email)
        if (emailExist) {
            return new ErrorModel('邮箱已存在！')
        } 

        const captcha = createCaptcha()

        try {
            return await saveCaptcha(email, captcha)
        } catch (err) {
            console.log(err)
        }

    } catch (err) {
        console.log(err)
    }
    
}


module.exports = emailVerify
