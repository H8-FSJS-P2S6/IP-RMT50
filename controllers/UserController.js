const { comparePassword } = require('../helpers/bcrypt');
const { signToken } = require('../helpers/jwt');
const { User } = require('../models');

module.exports = {
    async register(req, res, next) {
        try {
            const user = await User.create(req.body);
            res.status(201).json({ id: user.id, email: user.email });
        } catch (err) {
            next(err);
        };
    },

    async addUser(req, res, next) {
        try {
            const user = await User.create(req.body);
            res.status(201).json({ id: user.id, email: user.email });
        } catch (err) {
            next(err);
        };
    },

    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            if (!email) {
                throw ({ name: `email req` });
            };
            if (!password) {
                throw ({ name: `pass req` });
            };
            const user = await User.findOne({ where: { email } });
            if (!user) {
                throw ({ name: `email false` })
            };
            const checkToken = comparePassword(password, user.password);
            if (!checkToken) {
                throw ({ name: `pass fail` })
            };
            const token = signToken({ id: user.id })
            res.status(200).json({ access_token: token })
        } catch (err) {
            next(err);
        };
    },

    async getUser(req, res, next) {
        try {
            const users = await User.findAll();
            res.status(200).json({ users })
        } catch (err) {
            next(err);
        };
    },

    async getUserById(req, res, next) {
        const { id } = req.params;
        try {
            const users = await User.findByPk(id);
            if(!users){
                throw ({name: `UserNotFound`, id})
            }
            res.status(200).json({ users })
        } catch (err) {
            next(err);
        };
    },
}