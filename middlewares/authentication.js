const { User } = require("../models");
const { verifyToken } = require("../helpers/jwt");

async function authentication(req, res, next) {
  try {
  
    let access_token = req.headers.authorization;
    // console.log(access_token)
    if (!access_token){
      throw { name: "Unauthenticated" }
    }
    let [bearer, token] = access_token.split(" ");
    if (bearer !== "Bearer") {
      throw { name: "Unauthenticated" };
    }
    const JWT_SECRET = process.env.JWT_SECRET;
    let payload = verifyToken(token, JWT_SECRET);
    let user = await User.findByPk(payload.id);
    // console.log(payload, user);

    if (!user) {
      throw { name: "Unauthenticated" };
    }

    req.user = {
      id: user.id,
      role: user.role,
    };

    next();
  } catch (err) {
    // console.log(err);
    next(err);
  }
}



module.exports = { authentication };
