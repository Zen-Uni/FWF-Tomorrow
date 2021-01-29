const nodemailer = require('nodemailer')

const mailTransport = nodemailer.createTransport({
    host: "smtp.163.com",
    port: '465',
    secureConnection: true,
    auth: {
        user: "we_found_404@163.com",
        pass: "YVSUHVTEDLZAOYMD",
    }
})


module.exports = mailTransport