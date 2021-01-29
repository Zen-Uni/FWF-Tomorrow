/**
 * @description middleware about jwt
 * @author Uni
 */


const jwt = require('jsonwebtoken')

const { ErrorModel } = require('../../config/resultModel')

const jwtRightVerify = async (ctx, next) => {
    return next().catch(err => {
        if (err.status == 401) {
            ctx.body = new ErrorModel('用户鉴权失败')
        } else {
            throw err
        }
    })
}

/**
 * @description integrate information
 * @param {string} secret
 * @returns {function} dispatch token function 
 */
const createToken = (secret) => {
    return async (username) => {
        return new Promise((resolve, reject) => {
            const token = jwt.sign({username}, secret, {
                notBefore: 0,
                expiresIn: 60 * 60 * 24
            })
            resolve(token)
        })
    }
}



module.exports = {
    jwtRightVerify,
    createToken
}