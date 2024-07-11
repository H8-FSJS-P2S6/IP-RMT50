const { Party, Team } = require('../models');


module.exports = {
    async authorization(req, res, next) {
        const id = req.params.id
        try {
            const party = await Party.findByPk(id, { include: Team });
            if (!party) {
                throw ({ name: `delete 404`, id });
            };
            if (req.user.role === `Staff`) {
                if (party.UserId !== req.user.id) {
                    throw ({ name: `Forbidden` })
                }
            }
            next();
        } catch (err) {
            next(err);
        };
    },

    async isAdmin(req, res, next) {
        try {
            if (req.user.role !== 'Admin') {
                throw ({ name: `Forbidden` })
            }
            next();
        } catch (err) {
            next(err)
        }
    },

}