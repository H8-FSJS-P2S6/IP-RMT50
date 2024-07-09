const { Weapon } = require('../models');

module.exports = {
    async getWeapons(req, res, next) {
        try {
            const data = await Weapon.findAll();
            res.status(200).json({ data });
        } catch (err) {
            next(err);
        };
    },

    async getWeaponById(req, res, next) {
        try {
            const { id } = req.params
            const data = await Weapon.findByPk(id);
            if (!data) {
                throw ({ name: `404`, id: id })
            }
            res.status(200).json({ data })
        } catch (err) {
            next(err);
        };
    }
}