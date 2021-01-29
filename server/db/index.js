/**
 * @description Server Model
 * @author Uni
 */

const mongoose = require('./connect')

// define Schema
const userSchema = mongoose.Schema({
    username: String,
    password: String,
    email: {
        type: String,
        unique: true,
    }
})

const captchaSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true,
    },
    captcha: String
})


//define data model
const User = mongoose.model('users', userSchema)
const Captcha = mongoose.model('captchas', captchaSchema)

module.exports = {
    User,
    Captcha,
}