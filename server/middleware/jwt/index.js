/**
 * @description integration jwt functions
 * @author Uni
 */

const SECRET = require('./secret')
const {
    jwtRightVerify,
    createToken,
} = require('./koaJwt')   

// create dispatch token function
const dispatchToken = createToken(SECRET)



module.exports = {
    SECRET,
    jwtRightVerify,
    dispatchToken,
}
