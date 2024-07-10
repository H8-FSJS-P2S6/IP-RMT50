var jwt = require('jsonwebtoken');

function signToken(value){
    var token = jwt.sign(value, 'shhhhh');
    return token
}

function verifyToken(value){
    try {
        var decoded = jwt.verify(value, 'shhhhh');
        return decoded
    } catch (err) {
        return undefined
    }
}

module.exports = {signToken, verifyToken}