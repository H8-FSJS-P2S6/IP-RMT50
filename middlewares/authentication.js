const { verifyToken } = require("../helpers/jwt");
const { User } = require('../models');

module.exports = {
    async authentication(req, res, next) {
        try {
            let access_token = req.headers.authorization;
            if (!access_token) {
                throw ({ name: `Unauthenticated` });
            }
            let [bearer, token] = access_token.split(' ');
            if (bearer !== `Bearer`) {
                throw ({ name: `Unauthenticated` });
            };
            let { id } = verifyToken(token);
            let user = await User.findByPk(id);
            if (!user) {
                throw ({ name: `Unauthenticated` });
            };
            req.user = {
                id: user.id,
                role: user.role
            };
            next();
        } catch (err) {
            next(err)
        }
    }
}