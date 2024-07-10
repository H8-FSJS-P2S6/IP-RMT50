const { verifyToken } = require("../helpers/jwt")
const User = require(`../models`).User


async function authentication(req, res, next) {
    try {
        let access_token = req.headers.authorization
        if (!access_token) {
            throw { name: "Unauthenticated" }
        }
       
        let [ bearer, token ] = access_token.split(" ")
        if (bearer != "Bearer") {
            throw { name: "Unauthenticated" }
        }
        let payload = verifyToken(token)

        let user = await User.findByPk(payload.id)
        if (!user) {
            throw { name: "Unauthenticated" }
        }

        req.user = { id: payload.id }
        next()

    } catch (err) {
        console.log(err)
       
    }
}

module.exports = authentication
