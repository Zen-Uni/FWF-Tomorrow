const mongoose = require('mongoose')
const {
    config_dev,
    config_pro
} = require('./config')

const env = process.env.NODE_ENV

let path

if (env === 'dev') {
    path = config_dev.path
} else {
    path = config_pro.path
}

mongoose.connect(path)

module.exports = mongoose