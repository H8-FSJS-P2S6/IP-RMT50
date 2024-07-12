const { comparePassword } = require('../helpers/bcrypt');
const { signToken } = require('../helpers/jwt');
const { User } = require('../models');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client();

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
                throw ({ name: `pass false` })
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
            if (!users) {
                throw ({ name: `UserNotFound`, id })
            }
            res.status(200).json({ users })
        } catch (err) {
            next(err);
        };
    },

    async loginGoogle(req, res, next) {
        try {
            const ticket = await client.verifyIdToken({
                idToken: req.body.googleToken,
                audience: "848600054102-tftpfkiph7b62bugt6284mloq4ckpau9.apps.googleusercontent.com",
            });
            const payload = ticket.getPayload();
            const [user, created] = await User.findOrCreate({
                where: { email: payload.email },
                hooks: false,
                defaults: {
                    name: payload.name,
                    email: payload.email,
                    password: Math.random().toString()
                },
            });
            const access_token = signToken({ id: user.id })
            res.status(created ? 201 : 200).json({ access_token })
        } catch (err) {
            next(err)
        }
    }
}