const { Party, Team, Character } = require('../models');

module.exports = {
    async getParty(req, res, next) {
        try {
            const party = await Party.findAll({
                where: { UserId: req.user.id },
                attributes: { exclude: ['createdAt', 'updatedAt'] },
                include: [{ model: Team, attributes: { exclude: ['createdAt', 'updatedAt'] } }]
            });
            res.status(200).json({ party });
        } catch (err) {
            next(err);
        };
    },

    async getCharacter(req, res, next) {
        try {
            const data = await Character.findAll();
            res.status(200).json({ data })
        } catch (err) {
            next(err)
        }
    },

    async getCharacterById(req, res, next) {
        const { id } = req.params
        try {
            const data = await Character.findByPk(id);
            res.status(200).json({ data })
        } catch (err) {
            next(err)
        }
    },

    async createParty(req, res, next) {
        try {
            const checking = await Party.findAll({ where: { UserId: req.user.id }, raw: true })
            if (checking.length > 1) {
                throw ({ name: `Party Full` });
            };
            const party = await Party.create({ UserId: req.user.id });
            res.status(201).json({ party });
        } catch (err) {
            next(err);
        };
    },

    async deleteParty(req, res, next) {
        const { id } = req.params;
        try {
            const party = await Party.findByPk(id, { include: Team });
            if (party.Teams.length > 0) {
                throw ({ name: `cannot delete` })
            };
            await party.destroy();
            res.status(200).json({ message: `Party with id ${party.id} has been deleted` });
        } catch (err) {
            next(err);
        }
    },

    async createTeam(req, res, next) {
        const { id } = req.params
        try {
            const checking = await Team.findAll({ where: { PartyId: id } });
            if (checking.length > 3) {
                throw ({ name: `Team Full` })
            };
            const team = await Team.create({
                ...req.body, PartyId: id,
            });
            res.status(201).json({ team });
        } catch (err) {
            next(err);
        };
    },

    async updateTeam(req, res, next) {
        const { CharacterId, WeaponId } = req.body;
        const { teamId } = req.params;
        try {
            const team = await Team.findByPk(teamId);
            await team.update({ CharacterId, WeaponId })
            res.status(200).json({ team })
        } catch (err) {
            next(err);
        };
    },

    async deleteTeam(req, res, next) {
        const { teamId } = req.params;
        try {
            const team = await Team.findByPk(teamId);
            if (!team) {
                throw ({ name: `TeamNotFound`, id: teamId })
            };
            team.destroy();
            res.status(200).json({ message: `Team with id ${team.id} has been deleted` })
        } catch (err) {
            next(err);
        };
    }
}
