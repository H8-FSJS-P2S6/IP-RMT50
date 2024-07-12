const { verifyToken } = require("../helpers/jwt")
const User = require(`../models`).User


async function authentication(req, res, next) {
    try {
        let access_token = req.headers.authorization
        if (!access_token) {
            res.status(401).json({message:"Unauthenticated"})
            return
        }
       
        let [ bearer, token ] = access_token.split(" ")
        if (bearer != "Bearer") {
            res.status(401).json({message:"Unauthenticated"})
            return
        }
        let payload = verifyToken(token)
        if(payload == undefined){
            res.status(401).json({message:"You are not logged in!"})
            console.log("access_token not exist")
            return
        }

        let user = await User.findByPk(payload.id)
        if (!user) {
            res.status(401).json({message:"Unauthenticated"})
            return
        }

        req.user = { id: payload.id }
        next()

    } catch (err) {
        console.log(err)
       
    }
}

module.exports = authentication
