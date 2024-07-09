const { Party } = require('../models');

module.exports = {
    async getParty(req, res, next) {
        try {
            const party = await Party.findAll({
                where: { UserId: req.user.id }
            });
            res.status(200).json({ party });
        } catch (err) {
            next(err);
        };
    },

    async createParty(req, res, next) {
        try {
            console.log(req.user.id)
            const party = await Party.create({
                UserId: req.user.id,
                CharacterId: +(req.body.CharacterId),
                WeaponId: +(req.body.WeaponId)
            });
            console.log(party, '<<<<')
            // res.status(201).json({ party })
        } catch (err) {
            console.log(err)
            next(err);
        };
    }
}