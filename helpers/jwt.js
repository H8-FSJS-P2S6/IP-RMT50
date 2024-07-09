const { sign, verify } = require('jsonwebtoken')
const secret = process.env.SECRET_KEY;

module.exports = {
    signToken(payload) {
        return sign(payload, secret)
    },

    verifyToken(token) {
       return  verify(token, secret)
    }
}